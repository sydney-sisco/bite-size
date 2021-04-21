<script>
	
	import logo from "../../static/logo.png";
	import sapper_logo from "../../static/Sapper.png";
	import fastify_logo from "../../static/fastify-logo.png";
	import syd from "../../static/syd.png";
	import evan from "../../static/evan.png";
	import eppalea from "../../static/EL2.png";
	import github from "../../static/githublogo.png";
  


</script>

<style>

	main {
		background-color: #ebebeb;
  	background-image: url("https://www.transparenttextures.com/patterns/exclusive-paper.png");
	}

	img {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.logo {
		width: 30%;
	}

	p {
    align-items: center;
		text-align: center;
		margin: 0 auto;
	}

	p {
		margin: 1em auto;
		font-size: 16pt;
	}

	.stack {
		display: flex;
		height: 175px;
    margin: 25px;
	}

	.team {
		display: flex;
	}

	.team img {
		width: 30%;
	}

	.eppalea {
		width: 464px;
		height: 256.23px;
	}

	.el-img {
		height: 120.3px;
		width: 120.3px;
	}

	.el-gh {
		height: 35.37px;
		width: 120.3px;
	}

	
</style>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<main class="main">
	<img class="logo" src="{logo}" alt="bite size logo">

	<!-- <p>a more digestible recipe site</p> -->

	<div class="stack"> 
		<!-- <img src="{svelte_logo}" alt="svelte logo"> -->
		<img src="{sapper_logo}" alt="sapper logo">
		<img src="{fastify_logo}" alt="fastify logo">
	</div>
	<div class="team">
		<div class="evan">
			<img src="{evan}" alt="evan profile">
			<img src="{github}" alt="github logo">
			<p>evanquirk</p>
		</div>
		<div class="syd">
			<img src="{syd}" alt="syd profile">
			<img src="{github}" alt="github logo">
			<p>sydney-sisco</p>
		</div>
		<div class="eppalea">
			<img class="el-img" src="{eppalea}" alt="eppalea profile">
			<img class="el-gh" src="{github}" alt="github logo">
			<p>eppalea</p>
		</div>
	</div>

</main>
	
	