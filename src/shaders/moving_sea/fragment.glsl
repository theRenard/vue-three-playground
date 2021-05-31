uniform sampler2D uNormalMap;
varying vec2 vUv;

void main()
{
    vec3 normalColor = texture2D(uNormalMap, vUv).xyz;
    gl_FragColor = vec4(normalColor, 1.0);
}