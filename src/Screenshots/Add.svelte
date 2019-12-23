<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import screenshots from '../screenshot-store.js';

  const dispatch = createEventDispatcher();

  let youtube = false;
  let youtubeSrc = '';
  let vidUrl = '';
  let vidType = 'mp4'; 
  let tags = '';
  let siteUrl = '';
  let codeUrl = '';

  function closeAdd() {
    dispatch("close");
  }

  function addscreenshot() {
    const screenshotData = {
      youtube: youtube,
      youtubeSrc: youtubeSrc,
      vidUrl: vidUrl,
      vidType: vidType,
      tags: tags,
      siteUrl: siteUrl,
      codeUrl: codeUrl
    }
    fetch("https://screenshot-demos.firebaseio.com/screenshots.json", {
          method: "POST",
          body: JSON.stringify({ ...screenshotData }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => {
            if (!res.ok) {
              throw new Error("An error occurred, please try again!");
            }
            return res.json();
          })
          .then(data => {
            screenshots.addScreenshot({
              ...screenshotData,
              id: data.name
            });
          })
          .catch(err => {
            console.log(err);
          });
        dispatch("close");
  }
  
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
  .add-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  .add {
    position: fixed;
    padding: 5px;
    top: 10vh;
    left: 4%;
    width: 90%;
    max-height: 80vh;
    background-color: cornflowerblue;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }

   button {
    font: inherit;
    font-size: 16px;
    border: 1px solid #3b24bd;
    background: #3b24bd;
    height: 60%;
    align-self: center;
    padding: 0 5px 0 5px;
    margin: 0 8px 0 8px;
    line-height: 15px;
    color: rgb(235, 211, 214);
    text-shadow: 2px 2px 3px black;
    border-radius: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    text-decoration: none;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    background: #3b24bd;
    border-color: #3b24bd;
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }

  .content {
    background-color: cornflowerblue;
    line-height: 20px;
    padding: 5px;
  }

  input, textarea {
    background-color: rgb(207, 211, 243);
    border-radius: 5px;
    border: 1px solid rgb(68, 68, 121);
    width: 95%;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
  }

  select {
    background-color: rgb(207, 211, 243);
    border-radius: 5px;
    border: 1px solid rgb(68, 68, 121);
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
  }

  label {
    font-size: 15px;
  }
  label textarea {
    vertical-align: top;
  }
  #youtube-choice {
    font-weight: bold;
  }

  .youtube-radio-btn {
    display: inline-block;
    padding: 0 10px 0 10px;
    background-color: #254dd1;
    color: antiquewhite;
    border-radius: 5px;
  }

   @media (min-width: 768px) {
    .add {
      width: 40rem;
      left: calc(50% - 20rem);
      overflow: hidden;
    }
    input, textarea {
      width: 70%;
    }
  }
</style>

<div transition:fade class="add-backdrop" on:click={closeAdd} />
<div transition:fly={{ x: -800 }} class="add">
  <h1>Add Your Screenshot</h1>
  <div class="content">
    <label id="youtube-choice" for="youtube-notyoutube">Is this a Youtube video?</label>
      <div class="youtube-radio-btn">
        <label for="not-youtube">Not a Youtube video</label>
        <input type="radio" name="youtube" value="false" on:click={event => (youtube = false)} checked>
      </div>
      <div class="youtube-radio-btn"> 
        <label for="youtube-ture">A Youtube video</label> 
        <input type="radio" name="youtube" value="ture" on:click={event => (youtube = true)}>
      </div>
    {#if !youtube}
      <label for="vid-url">Video Url:</label>
      <input id="vid-url" type="text" value="{vidUrl}" placeholder="Link to video no longer than 4 minutes" on:input={event => (vidUrl = event.target.value)}><br>
      <label for="vid-type">Video Type:</label>
      <select id="vid-tpye" on:change={event => (vidType = event.target.value)} >
        <option value="mp4" >MP4</option>
        <option value="webm" >WebM</option>
        <option value="ogg" >Ogg</option>
      </select>
    {:else}
      <label for="youtube-url">Youtube url:</label>
      <input id="youtube-url" type="text" value="{youtubeSrc}" placeholder="Please add the embed Url from your youtube video" on:input={event => (youtubeSrc = event.target.value)}><br>
    {/if}
    <hr>
    <label for="site-url">Site Url:</label>
    <input id="site-url"type="text" value="{siteUrl}" on:input={event => (siteUrl = event.target.value)}><hr>
    <label for="code-url">Link to code:</label>
    <input id="code-url" type="text" value="{codeUrl}" on:input={event => (codeUrl = event.target.value)}><hr>
    <label for="tag">Tags:
      <textarea rows="4" value="{tags}" placeholder="Separate tags with commas. Add a unique tag so you can find your own screenshot in search." on:input={event => (tags = event.target.value)}></textarea>
    </label>
  </div>
  <footer>
    <slot name="footer">
      <button on:click={closeAdd}>Close</button>
      <button on:click={addscreenshot}>Add Screenshot</button>
    </slot>
  </footer>
</div>