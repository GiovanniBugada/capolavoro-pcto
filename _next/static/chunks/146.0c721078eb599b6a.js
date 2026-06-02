"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[146],{7146:function(e,t,i){let n,r;i.r(t),i.d(t,{default:function(){return k}});var a=i(7437),o=i(2265),s=i(4231),l=i(7283);function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)({}).hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(null,arguments)}var u=i(1448);let c=new u.Box3,f=new u.Vector3;class p extends u.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new u.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new u.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new u.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new u.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new u.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new u.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new u.InterleavedBufferAttribute(n,t,0)),this.setAttribute("instanceColorEnd",new u.InterleavedBufferAttribute(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new u.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new u.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new u.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)f.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(f)),f.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(f));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}let h=parseInt(u.REVISION.replace(/\D+/g,""));class m extends u.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:u.UniformsUtils.clone(u.UniformsUtils.merge([u.UniformsLib.common,u.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new u.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h>=125?"uv1":"uv2",y=new u.Vector4,g=new u.Vector3,w=new u.Vector3,b=new u.Vector4,S=new u.Vector4,x=new u.Vector4,E=new u.Vector3,_=new u.Matrix4,A=new u.Line3,L=new u.Vector3,U=new u.Box3,z=new u.Sphere,M=new u.Vector4;function B(e,t,i){return M.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),M.multiplyScalar(1/M.w),M.x=r/i.width,M.y=r/i.height,M.applyMatrix4(e.projectionMatrixInverse),M.multiplyScalar(1/M.w),Math.abs(Math.max(M.x,M.y))}class O extends u.Mesh{constructor(e=new p,t=new m({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)g.fromBufferAttribute(t,e),w.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+g.distanceTo(w);let r=new u.InstancedInterleavedBuffer(n,2,1);return e.setAttribute("instanceDistanceStart",new u.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new u.InterleavedBufferAttribute(r,1,1)),this}raycast(e,t){let i,a;let o=this.material.worldUnits,s=e.camera;null!==s||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let d=this.matrixWorld,c=this.geometry,f=this.material;if(r=f.linewidth+l,null===c.boundingSphere&&c.computeBoundingSphere(),z.copy(c.boundingSphere).applyMatrix4(d),o)i=.5*r;else{let e=Math.max(s.near,z.distanceToPoint(n.origin));i=B(s,e,f.resolution)}if(z.radius+=i,!1!==n.intersectsSphere(z)){if(null===c.boundingBox&&c.computeBoundingBox(),U.copy(c.boundingBox).applyMatrix4(d),o)a=.5*r;else{let e=Math.max(s.near,U.distanceToPoint(n.origin));a=B(s,e,f.resolution)}U.expandByScalar(a),!1!==n.intersectsBox(U)&&(o?function(e,t){let i=e.matrixWorld,a=e.geometry,o=a.attributes.instanceStart,s=a.attributes.instanceEnd,l=Math.min(a.instanceCount,o.count);for(let a=0;a<l;a++){A.start.fromBufferAttribute(o,a),A.end.fromBufferAttribute(s,a),A.applyMatrix4(i);let l=new u.Vector3,d=new u.Vector3;n.distanceSqToSegment(A.start,A.end,d,l),d.distanceTo(l)<.5*r&&t.push({point:d,pointOnLine:l,distance:n.origin.distanceTo(d),object:e,face:null,faceIndex:a,uv:null,[v]:null})}}(this,t):function(e,t,i){let a=t.projectionMatrix,o=e.material.resolution,s=e.matrixWorld,l=e.geometry,d=l.attributes.instanceStart,c=l.attributes.instanceEnd,f=Math.min(l.instanceCount,d.count),p=-t.near;n.at(1,x),x.w=1,x.applyMatrix4(t.matrixWorldInverse),x.applyMatrix4(a),x.multiplyScalar(1/x.w),x.x*=o.x/2,x.y*=o.y/2,x.z=0,E.copy(x),_.multiplyMatrices(t.matrixWorldInverse,s);for(let t=0;t<f;t++){if(b.fromBufferAttribute(d,t),S.fromBufferAttribute(c,t),b.w=1,S.w=1,b.applyMatrix4(_),S.applyMatrix4(_),b.z>p&&S.z>p)continue;if(b.z>p){let e=b.z-S.z,t=(b.z-p)/e;b.lerp(S,t)}else if(S.z>p){let e=S.z-b.z,t=(S.z-p)/e;S.lerp(b,t)}b.applyMatrix4(a),S.applyMatrix4(a),b.multiplyScalar(1/b.w),S.multiplyScalar(1/S.w),b.x*=o.x/2,b.y*=o.y/2,S.x*=o.x/2,S.y*=o.y/2,A.start.copy(b),A.start.z=0,A.end.copy(S),A.end.z=0;let l=A.closestPointToPointParameter(E,!0);A.at(l,L);let f=u.MathUtils.lerp(b.z,S.z,l),h=f>=-1&&f<=1,m=E.distanceTo(L)<.5*r;if(h&&m){A.start.fromBufferAttribute(d,t),A.end.fromBufferAttribute(c,t),A.start.applyMatrix4(s),A.end.applyMatrix4(s);let r=new u.Vector3,a=new u.Vector3;n.distanceSqToSegment(A.start,A.end,a,r),i.push({point:a,pointOnLine:r,distance:n.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[v]:null})}}}(this,s,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(y),this.material.uniforms.resolution.value.set(y.z,y.w))}}class C extends p{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class D extends O{constructor(e=new C,t=new m({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let T=o.forwardRef(function({points:e,color:t=16777215,vertexColors:i,linewidth:n,lineWidth:r,segments:a,dashed:l,...c},f){var h,v;let y=(0,s.D)(e=>e.size),g=o.useMemo(()=>a?new O:new D,[a]),[w]=o.useState(()=>new m),b=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,S=o.useMemo(()=>{let n=a?new p:new C,r=e.map(e=>{let t=Array.isArray(e);return e instanceof u.Vector3||e instanceof u.Vector4?[e.x,e.y,e.z]:e instanceof u.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=16777215;let e=i.map(e=>e instanceof u.Color?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,a,i,b]);return o.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),o.useLayoutEffect(()=>{l?w.defines.USE_DASH="":delete w.defines.USE_DASH,w.needsUpdate=!0},[l,w]),o.useEffect(()=>()=>{S.dispose(),w.dispose()},[S]),o.createElement("primitive",d({object:g,ref:f},c),o.createElement("primitive",{object:S,attach:"geometry"}),o.createElement("primitive",d({object:w,attach:"material",color:t,vertexColors:!!i,resolution:[y.width,y.height],linewidth:null!==(v=null!=n?n:r)&&void 0!==v?v:1,dashed:l,transparent:4===b},c)))}),R=e=>"function"==typeof e,P=o.forwardRef(({envMap:e,resolution:t=256,frames:i=1/0,children:n,makeDefault:r,...a},l)=>{let c=(0,s.D)(({set:e})=>e),f=(0,s.D)(({camera:e})=>e),p=(0,s.D)(({size:e})=>e),h=o.useRef(null);o.useImperativeHandle(l,()=>h.current,[]);let m=o.useRef(null),v=function(e,t,i){let n=(0,s.D)(e=>e.size),r=(0,s.D)(e=>e.viewport),a="number"==typeof e?e:n.width*r.dpr,l=n.height*r.dpr,{samples:d=0,depth:c,...f}=("number"==typeof e?void 0:e)||{},p=o.useMemo(()=>{let e=new u.WebGLRenderTarget(a,l,{minFilter:u.LinearFilter,magFilter:u.LinearFilter,type:u.HalfFloatType,...f});return c&&(e.depthTexture=new u.DepthTexture(a,l,u.FloatType)),e.samples=d,e},[]);return o.useLayoutEffect(()=>{p.setSize(a,l),d&&(p.samples=d)},[d,p,a,l]),o.useEffect(()=>()=>p.dispose(),[]),p}(t);o.useLayoutEffect(()=>{a.manual||h.current.updateProjectionMatrix()},[p,a]),o.useLayoutEffect(()=>{h.current.updateProjectionMatrix()}),o.useLayoutEffect(()=>{if(r)return c(()=>({camera:h.current})),()=>c(()=>({camera:f}))},[h,r,c]);let y=0,g=null,w=R(n);return(0,s.F)(t=>{w&&(i===1/0||y<i)&&(m.current.visible=!1,t.gl.setRenderTarget(v),g=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,h.current),t.scene.background=g,t.gl.setRenderTarget(null),m.current.visible=!0,y++)}),o.createElement(o.Fragment,null,o.createElement("orthographicCamera",d({left:-(p.width/2),right:p.width/2,top:p.height/2,bottom:-(p.height/2),ref:h},a),!w&&n),o.createElement("group",{ref:m},w&&n(v.texture)))}),I={primary:"#fafaf7",accent:"#f59e0b",dim:"#8a8a92"},j={primary:"#0a0a0a",accent:"#f59e0b",dim:"#71717a"};function V(e){let{a:t,b:i,kind:n,width:r,delay:l,startRef:d,revealMs:c,palette:f}=e,p=f[n];(0,o.useRef)(null);let h=(0,o.useMemo)(()=>new u.Vector3(...t),[t]),m=(0,o.useMemo)(()=>new u.Vector3(...i),[i]),v=(0,o.useMemo)(()=>new u.Vector3,[]),y=(0,o.useRef)(null);return(0,s.F)(e=>{let{clock:t}=e;null===d.current&&(d.current=t.getElapsedTime());let i=t.getElapsedTime()-d.current,n=u.MathUtils.clamp(i/(c/1e3),0,1),r=u.MathUtils.clamp((n-l)/.5,0,1);if(y.current){v.lerpVectors(h,m,r);let e=y.current.geometry,t=e.attributes.position;t.setXYZ(0,h.x,h.y,h.z),t.setXYZ(1,v.x,v.y,v.z),t.needsUpdate=!0,e.computeBoundingSphere(),y.current.visible=r>0}}),(0,a.jsx)(T,{ref:y,points:[h,m],color:p,lineWidth:r,transparent:!0,opacity:.92})}function H(e){let{revealMs:t,mouseRef:i,palette:n}=e,r=(0,o.useRef)(null),l=(0,o.useRef)(null),d=(0,o.useMemo)(()=>(function(){let e=1.1*3,t=[],i=[[-1.5,-1.2],[1.5,-1.2],[1.5,1.2],[-1.5,1.2]];for(let n=0;n<=3;n++){let r=1.1*n;for(let a=0;a<4;a++){let o=i[a],s=i[(a+1)%4];t.push({a:[o[0],r,o[1]],b:[s[0],r,s[1]],kind:0===n||3===n?"primary":"dim",width:1.3,delay:r/e*.45})}}i.forEach(i=>{let[n,r]=i;t.push({a:[n,0,r],b:[n,e,r],kind:"primary",width:1.5,delay:.08})});let n=e=>-1.05+1.05*e;for(let i=0;i<3;i++){let r=1.1*i+.28,a=r/e*.45+.05;for(let e=0;e<3;e++){let i=n(e);[-1.2,1.2].forEach(e=>{let n=[i-.275,r,e],o=[i+.275,r,e],s=[i+.275,r+.6,e],l=[i-.275,r+.6,e];t.push({a:n,b:o,kind:"accent",width:1.1,delay:a}),t.push({a:o,b:s,kind:"accent",width:1.1,delay:a}),t.push({a:s,b:l,kind:"accent",width:1.1,delay:a}),t.push({a:l,b:n,kind:"accent",width:1.1,delay:a})})}for(let e=0;e<2;e++){let i=-.75+1.5*e;[-1.5,1.5].forEach(e=>{let n=[e,r,i-.275],o=[e,r,i+.275],s=[e,r+.6,i+.275],l=[e,r+.6,i-.275];t.push({a:n,b:o,kind:"accent",width:1.1,delay:a}),t.push({a:o,b:s,kind:"accent",width:1.1,delay:a}),t.push({a:s,b:l,kind:"accent",width:1.1,delay:a}),t.push({a:l,b:n,kind:"accent",width:1.1,delay:a})})}}return t.push({a:[-1.5,e,-1.2],b:[1.5,e,1.2],kind:"dim",width:1,delay:.62}),t.push({a:[1.5,e,-1.2],b:[-1.5,e,1.2],kind:"dim",width:1,delay:.64}),t.push({a:[-4,0,0],b:[4,0,0],kind:"dim",width:.7,delay:0}),t.push({a:[0,0,-4],b:[0,0,4],kind:"dim",width:.7,delay:0}),t})(),[]);return(0,s.F)(e=>{let{camera:t}=e;r.current&&(r.current.rotation.y+=.0025);let n=3.5+1*i.current.x,a=2.2+.6*i.current.y;t.position.x+=(n-t.position.x)*.05,t.position.y+=(a-t.position.y)*.05,t.lookAt(0,1.4,0)}),(0,a.jsx)("group",{ref:r,position:[0,-1.4,0],children:d.map((e,i)=>(0,a.jsx)(V,{...e,startRef:l,revealMs:t,palette:n},i))})}function k(e){let{revealMs:t=3e3,interactive:i=!0,className:n,theme:r="dark"}=e,s=(0,o.useRef)({x:0,y:0}),d=(0,o.useRef)(null);return(0,o.useEffect)(()=>{if(!d.current)return;let e=d.current,t=()=>window.dispatchEvent(new Event("resize")),i=[window.setTimeout(t,0),window.setTimeout(t,80),window.setTimeout(t,300),window.setTimeout(t,800)],n=new ResizeObserver(t);return n.observe(e),()=>{i.forEach(e=>window.clearTimeout(e)),n.disconnect()}},[]),(0,a.jsx)("div",{ref:d,onMouseMove:e=>{if(!i)return;let t=e.currentTarget.getBoundingClientRect();s.current.x=(e.clientX-t.left)/t.width*2-1,s.current.y=-((e.clientY-t.top)/t.height*2-1)},className:n,style:{width:"100%",height:"100%"},children:(0,a.jsxs)(l.Xz,{dpr:[1,1.5],gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},style:{width:"100%",height:"100%"},children:[(0,a.jsx)(P,{makeDefault:!0,position:[3.5,2.2,4.5],zoom:110}),(0,a.jsx)("ambientLight",{intensity:.7}),(0,a.jsx)(o.Suspense,{fallback:null,children:(0,a.jsx)(H,{revealMs:t,mouseRef:s,palette:"light"===r?j:I})})]})})}}}]);