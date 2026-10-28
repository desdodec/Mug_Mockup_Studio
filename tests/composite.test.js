import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCalibration, selectSide } from '../src/rendering/composite.js';

test('rejects missing masks', () => {
  assert.throws(() => validateCalibration({version:1,width:2000,height:2000,mugs:[{id:'m1',quad:[[0,0],[1,0],[1,1],[0,1]]}]},2000,2000), /mask/);
});
test('rejects incorrect photo dimensions', () => {
  assert.throws(() => validateCalibration({version:1,width:2000,height:2000,mugs:[]},3000,3000), /dimensions/);
});
test('front and back are disjoint', () => {
  const im={width:3000,height:1200}, f=selectSide(im,'front'),b=selectSide(im,'back');
  assert.equal(f.x+f.width,b.x);
  assert.equal(f.width+b.width,im.width);
});
test('allows adjustable front-back split', () => {
  assert.equal(selectSide({width:1000,height:100},'back',0.4).x,400);
});
