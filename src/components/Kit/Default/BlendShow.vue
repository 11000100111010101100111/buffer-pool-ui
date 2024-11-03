<template>
  <div ref="canvasContainer"></div>
</template>

<script>
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    export default {
        name: "BlendShow",
        props: {
          url: {
            type: 'String',
            required: true
          }
        },
        mounted() {
          this.initThree();
        },
        methods: {
          initThree() {
            // 创建场景、相机和渲染器
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.canvasContainer.appendChild(renderer.domElement);

            // 加载模型
            const loader = new GLTFLoader();
            loader.load(this.url, (gltf) => {
              scene.add(gltf.scene);
              renderer.render(scene, camera);
            }, undefined, (error) => {
              console.error(error);
            });

            // 设置相机位置
            camera.position.z = 5;

            // 动画循环
            const animate = function () {
              requestAnimationFrame(animate);
              renderer.render(scene, camera);
            };
            animate();
          }
      }
    }
</script>

<style scoped>

</style>
