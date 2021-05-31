uniform float uTime;
varying vec2 vUv;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    float pp = uv.y;
    pp = (pp + 1.0)  - fract(uTime * 0.1);

    vUv = vec2(uv.x, pp);

}