uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

void main()
{

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float scale = cos(uTime * modelPosition.y * modelPosition.x) * aScale;
    modelPosition.x += cos(uTime * (1.0 / aScale) / 2.0 + modelPosition.x * 100.0) * aScale * 0.2;
    modelPosition.y += sin(uTime * (1.0 / aScale) / 2.0 + modelPosition.y * 100.0) * aScale * 0.3;
    modelPosition.z += sin(uTime * (1.0 / aScale) / 2.0 + modelPosition.z * 100.0) * aScale * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = uSize * scale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
}