<script>
  import screenshots from './screenshot-store.js';
  import filteredArray from './screenshot-store.js';
  import { onMount, onDestroy } from "svelte";
  import { fade } from 'svelte/transition';
  import TopBar from './UI/TopBar.svelte';
  import BottomBar from './UI/BottomBar.svelte';
  import Add from './Screenshots/Add.svelte';
  import Search from './Screenshots/Search.svelte';

  export let segment;
  let addMode = false;
  let searchMode = false;
  let myStorage = window.localStorage;
 

  function addScreenshot() {
    addMode = true;
  }
  function addSearch() {
    searchMode = true;
  }

  function closeAdd() {
    addMode = false;
  }

  function closeSearch() {
    searchMode = false;
  }

  let isLoading = false;
  let loadedScreenshots = [];
  let unsubscribe;
  let filtered = false;
  let storedScreenshots = null;
  let i;
  let next = false;
  let youtube = false;
  let src = '';
  let youtubeSrc = '';
  let vidType = ''; 
  let isAwesome = false;
  let numberAwesome = 0;
  let srcCode = null;
  let liveSite = null;
  let id = "";

  isLoading = true;
  let getScreenshots = fetch("https://screenshot-demos.firebaseio.com/screenshots.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("Fetching meetups failed, please try again later!");
        }
        return res.json();
      })
      .then(data => {
        isLoading = false;
        const loadedScreenshots = [];
        for (const key in data) {
          loadedScreenshots.push({
            ...data[key],
            id: key
          });
        }
        screenshots.setScreenshots(loadedScreenshots);
        randomScreenshot(); 
      })
      .catch(err => {
        error = err;
        isLoading = false;
        console.log(err);
      });

    if (isLoading) {
    unsubscribe = screenshots.subscribe(items => {
    storedScreenshots = items;
    });
    
    }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function updateDatabase(id) {
    const screenshotData = {
      numberAwesome: numberAwesome,
    };
    fetch(`https://screenshot-demos.firebaseio.com/screenshots/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(screenshotData),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
        })
        .catch(err => {
          console.log(err);
        });
  };

  function toggleAwesome() {
    isAwesome = !isAwesome;
    if (!isAwesome) {
      numberAwesome = numberAwesome - 1;
      updateStorage(id);
      screenshots.updateMinusAwesome(id);
      updateDatabase(id);
    } 
    else {
      numberAwesome = numberAwesome + 1;
      updateStorage(id);
      screenshots.updateAddAwesome(id);
      updateDatabase(id);
    }
  }

   function loadMyNextStorage(id) {
    const awesomeStoreage = myStorage.getItem(id);
    if (awesomeStoreage === "true") {
      isAwesome = true;
    }
  }

  function updateStorage(id) {
    myStorage.setItem(id , isAwesome);
  }

  function loadNumberAwesome (num) {
    numberAwesome = num;
  }

  function randomScreenshot() {
    i = Math.floor(Math.random() * storedScreenshots.length);
    src = storedScreenshots[i].vidUrl;
    youtube = storedScreenshots[i].youtube;
    youtubeSrc = storedScreenshots[i].youtubeSrc;
    srcCode = storedScreenshots[i].codeUrl;
    liveSite = storedScreenshots[i].siteUrl;
    vidType = storedScreenshots[i].vidType;
    id = storedScreenshots[i].id;
    numberAwesome = ((storedScreenshots[i].numberAwesome) > 0 ? storedScreenshots[i].numberAwesome : 0);
    isAwesome = false;
    loadMyNextStorage(id);
    loadNumberAwesome(numberAwesome);
    next = !next;
  }


  if (isLoading && storedScreenshots.lenth > 0) {
    randomScreenshot();
  }

</script>

<style>
   header{
    position: fixed;
    top: 0;
    margin: 0;
    padding: 0;
    height: 70px;
  }
	main {
    height: 100vh;
    width: 100vw;
    background-color: rgb(52, 53, 53);
		padding: 0;
    margin: 0;
  }
  footer{
    position: fixed;
    bottom: 0;
  }

  #is-awesome {
    position: fixed;
    bottom: 5px;
    left: 85vw;
    height: 85px;
    width: 55px;
    z-index: 3;
    background-color: rgba(144, 145, 151, 0.6);
    border-radius: 6px;
    color: blanchedalmond;
    text-shadow: 1px 1px 2px black;
    text-align: center;
  }
  #is-awesome h3 {
    margin: 0;
    padding: 0;

  }

  #source-code {
    position: fixed;
    padding: 4px;
    bottom: 32px;
    left: 6px;
    color: rgba(236, 235, 234, 0.7);
    text-shadow: 1px 1px 2px rgb(10, 10, 10);
    background-color: rgba(83, 83, 83, 0.4);
    border-radius: 6px;
  }

  #live-site {
    position: fixed;
    padding: 4px;
    bottom: 32px;
    left: 112px;
    color: rgba(236, 235, 234, 0.7);
    text-shadow: 1px 1px 2px rgb(10, 10, 10);
    background-color: rgba(83, 83, 83, 0.4);
    border-radius: 6px;
  }

  a {
    cursor: pointer;
    color: rgba(236, 235, 234, 0.7);
    text-shadow: 1px 1px 2px rgb(10, 10, 10);
    text-decoration: none;
  }

  a:hover {
    padding: 3px;
    color: rgb(236, 235, 234);
    text-shadow: 1px 1px 2px rgb(10, 10, 10);
    background-color: rgba(230, 224, 224, 0.15);
    border-radius: 6px;
  }

  video {
    max-height: 78vh;
    max-width: 100vw;
    display: block;
    margin: 0 auto;
    padding-top: 70px;
  }

  .random {
    position: fixed;
    top: 50vh;
    right: 6px;
    color: #C4D0E7;
  }

  #next {
    height: 45px;
    cursor: pointer;
  }

  iframe {
    max-height: 78vh;
    max-width: 100vw;
    display: block;
    margin: 0 auto;
    padding-top: 70px;
  }

</style>

<svelte:head>
	<title>ScreenShot Demos</title>
</svelte:head>


<header>
  <TopBar on:addScreenshot={addScreenshot} on:addSearch={addSearch}></TopBar>
</header>

<main>
  {#if addMode}
    <Add on:close={closeAdd} />
  {:else if searchMode} 
    <Search on:closeIt={closeSearch}/>
  {:else}
    <div class="video">
      <div id="is-awesome">
        {#if isAwesome}
        <input type="image" src="awesome.svg" alt="awesome" on:click={toggleAwesome}>
        {:else}
        <input type="image" src="not-awesome.svg" alt="not-awesome" on:click={toggleAwesome} >
        {/if}
        <h3>{numberAwesome}</h3>
      </div>
      <div id="source-code">
        <a href="{srcCode}" target="_blank" >Source Code</a>
      </div>
      <div id="live-site">
        <a href="{liveSite}" target="_blank" >Vist Site</a>
      </div>
      <div class="random">
        <img id="next" src="next.svg" alt="next" on:click={randomScreenshot}>
      </div>
      {#if src !== ''|| youtubeSrc !== ''}
        {#if next && !youtube}
          <video autoplay loop muted transition:fade >
          <source src="{src}" type="video/mp4">
            Your browser does not support this video.
          </video>
        {:else if youtube}
        <iframe title="youtube video" width="560" height="315" src="{youtubeSrc + "&mute=1"}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        {:else}
          <video autoplay loop muted transition:fade >
          <source src="{src}" type="video/mp4">
            Your browser does not support this video.
          </video>
        {/if}
      {/if}
    </div>
  {/if}
</main>

<footer>
  <BottomBar></BottomBar>
</footer>
