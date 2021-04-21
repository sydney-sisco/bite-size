<!-- <script context="module">


	
	
</script> -->

<script>
	
	import logo from "../../static/logo.png";
	import sapper_logo from "../../static/Sapper.png";
	import svelte_logo from "../../static/svelte.png";
	import fastify_logo from "../../static/fastify-logo.png";
	import syd from "../../static/syd.png";
	import evan from "../../static/evan.png";
	// import eppalea from "../../static/eppalea.png";
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
		/* border: 2px solid blue; */
		display: flex;
		height: 175px;
    margin: 25px;
	}

	.team {
		/* border: 2px solid red; */
		display: flex;
	}
/* 
	.evan {
		border:  2px solid green;
	}

	.syd {
		border:  2px solid black;
	} */

	.eppalea {
		/* border: 2px solid purple; */
		width: 464px;
		height: 256.23px;
		
	}

	.el-img {
		height: 137.99px;
		width: 137.99px;
	}

	.el-gh {
		height: 40.57px;
		width: 137.99px;
	}

	
</style>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<main class="main">
	<img src="{logo}" alt="bite size logo">

	<p>a more digestible recipe site</p>

	<div class="stack"> 
		<img src="{svelte_logo}" alt="svelte logo">
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
	
	