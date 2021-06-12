<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
	#tab-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #eee;
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
		height: 49px;
  }
</style>
