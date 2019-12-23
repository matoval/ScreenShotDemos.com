<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function addScreenshot() {
    dispatch('addScreenshot');
  }

  function search() {
    dispatch('addSearch');
  }
  
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Staatliches&display=swap');
  .top-bar {
    position: fixed;
    display: grid;
    grid-template-areas: 
      "title"
      "buttons";
    margin: 0;
    padding: 0;
    top: 0;
    height: 70px;
    width: 100vw;
    background-color: rgb(40, 90, 131);
  }

   .title {
     grid-area: title;
    display: block;
    margin: 0;
    top: 0;
    padding: 0;
    height: 40px;
  }

  h1{
    margin: 0;
    padding: 0;
    color: rgb(235, 211, 214);
    font-family: 'Staatliches', cursive;
    font-size: 30px;
    line-height: 26px;
    text-shadow: 2px 2px 3px black;
    text-align: center;
  }

  .buttons {
    grid-area: buttons;
    display: flex;
    justify-content: space-between;
    height: 30px;
    margin: 0;
    padding: 0;
  }

   button {
    font: inherit;
    font-size: 16px;
    border: 1px solid #3b24bd;
    background: #3b24bd;
    height: 60%;
    align-self: center;
    padding: 2px;
    margin: 8px;
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

  #add-screenshot {
    font-size: 14px;
  }

</style>

<div class="top-bar">
  <div class="title">
    <h1>Screenshot Demos</h1>
  </div>
  <div class="buttons">
    <button id="add-screenshot" on:click={addScreenshot}>Add Your Screenshot</button>
  <button id="search" on:click={search}>Search</button>
  </div>
</div> 