/**
 * Deterministic photographic mug compositing.
 * All coordinates are in source-photograph pixels.
 * Calibration masks must match the photograph dimensions.
 */
export function validateCalibration(scene, width, height) {
  if (!scene || scene.version !== 1 || !Array.isArray(scene.mugs)) throw new Error('Invalid calibration version');
  if (scene.width !== width || scene.height !== height) throw new Error('Scene/calibration dimensions differ');
  if (scene.mugs.length < 1 || scene.mugs.length > 3) throw new Error('Expected 1–3 calibrated mugs');
  for (const mug of scene.mugs) {
    if (!mug.id || !Array.isArray(mug.quad) || mug.quad.length !== 4 ||
        mug.quad.some(p => !Array.isArray(p) || p.length !== 2 || p.some(v => !Number.isFinite(v)))) {
      throw new Error('Invalid mug quadrilateral');
    }
    if (!mug.surfaceMask || !mug.occlusionMask) throw new Error('Missing surface or occlusion mask');
  }
  return true;
}
export function selectSide(image, side, split = 0.5) {
  if (!image || !image.width || !image.height) throw new Error('Artwork missing');
  if (side !== 'front' && side !== 'back') throw new Error('Invalid artwork side');
  if (!(split > 0 && split < 1)) throw new Error('Split must be between zero and one');
  const cut = Math.round(image.width * split);
  return side === 'front' ? { x: 0, y: 0, width: cut, height: image.height }
    : { x: cut, y: 0, width: image.width - cut, height: image.height };
}
function canvas(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
}
function pixels(source, w, h) {
  const c = canvas(w, h), ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(source, 0, 0, w, h); return ctx.getImageData(0, 0, w, h).data;
}
function bilinear(a,b,c,d,u,v) {
  return a*(1-u)*(1-v)+b*u*(1-v)+c*u*v+d*(1-u)*v;
}
/**
 * Maps an artwork side onto a calibrated four-corner mug surface.
 * Corners ordered top-left, top-right, bottom-right, bottom-left.
 * Curvature is controlled by the calibrated horizontal arc in radians.
 * This is a 2D approximation, not a full 3D inverse camera solution.
 */
export function renderComposite({ photograph, calibration, assignments, masks }) {
  const { width, height } = photograph;
  validateCalibration(calibration, width, height);
  const out = canvas(width, height), ctx = out.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(photograph, 0, 0);
  const image = ctx.getImageData(0, 0, width, height);
  for (const mug of calibration.mugs) {
    const a = assignments[mug.id];
    if (!a || !a.image) continue;
    const surface = masks[mug.surfaceMask], occlusion = masks[mug.occlusionMask];
    if (!surface || !occlusion) throw new Error('Missing calibrated masks for ' + mug.id);
    const sm = pixels(surface, width, height), om = pixels(occlusion, width, height);
    const src = selectSide(a.image, a.side || 'front', a.split ?? 0.5);
    const art = pixels(a.image, a.image.width, a.image.height);
    const q = mug.quad, xs=q.map(p=>p[0]),ys=q.map(p=>p[1]);
    const left=Math.max(0,Math.floor(Math.min(...xs))),right=Math.min(width,Math.ceil(Math.max(...xs)));
    const top=Math.max(0,Math.floor(Math.min(...ys))),bottom=Math.min(height,Math.ceil(Math.max(...ys)));
    const arc = mug.arc ?? 1.25;
    const shade = mug.shading ?? 0.18;
    const opacity = Math.min(1, Math.max(0, a.opacity ?? 0.94));
    // Forward rasterisation in narrow vertical strips, with per-pixel clipping.
    const layer = canvas(width,height), lc=layer.getContext('2d');
    const strips = Math.max(256,Math.ceil(right-left));
    for(let i=0;i<strips;i++){
      const u=i/strips, next=(i+1)/strips;
      const warp=t=>0.5+Math.sin((t-0.5)*arc)/(2*Math.sin(arc/2));
      const x0=warp(u),x1=warp(next);
      const tx=bilinear(q[0][0],q[1][0],q[2][0],q[3][0],x0,0);
      const tx2=bilinear(q[0][0],q[1][0],q[2][0],q[3][0],x1,0);
      const ty=bilinear(q[0][1],q[1][1],q[2][1],q[3][1],x0,0);
      const ty2=bilinear(q[0][1],q[1][1],q[2][1],q[3][1],x0,1);
      const sx=src.x+Math.floor(u*src.width);
      lc.drawImage(a.image,sx,0,Math.max(1,Math.ceil(src.width/strips)),src.height,
        tx,ty,Math.max(1,Math.abs(tx2-tx)+1),ty2-ty);
    }
    const lp=lc.getImageData(0,0,width,height).data;
    for(let y=top;y<bottom;y++)for(let x=left;x<right;x++){
      const k=(y*width+x)*4;
      const mask=(sm[k+3]/255)*(sm[k]/255)*(1-om[k+3]/255*om[k]/255);
      if(mask<=0 || lp[k+3]===0)continue;
      const t=(x-left)/Math.max(1,right-left), edge=Math.pow(Math.abs(2*t-1),2);
      const light=1-shade*edge, alpha=opacity*mask*(lp[k+3]/255);
      for(let ch=0;ch<3;ch++)image.data[k+ch]=Math.round(image.data[k+ch]*(1-alpha)+lp[k+ch]*light*alpha);
      image.data[k+3]=255;
    }
  }
  ctx.putImageData(image,0,0);
  return out;
}
