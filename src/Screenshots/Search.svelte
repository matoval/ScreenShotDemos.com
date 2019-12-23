<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import screenshots from '../screenshot-store.js';

  const dispatch = createEventDispatcher();

  let search = ''; 

  function closeSearch() {
    dispatch("closeIt");
  }

  function searchScreenshot() {
    screenshots.filteredScreenshot(search);
    dispatch("closeIt");
    dispatch("filtered");
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
    line-height: 30px;
    padding: 10px;
  }

  input {
    background-color: rgb(207, 211, 243);
    border-radius: 5px;
    border: 1px solid rgb(68, 68, 121);
    width: 95%;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
  }

  label {
    font-size: 15px;
  }

   @media (min-width: 768px) {
    .add {
      width: 40rem;
      left: calc(50% - 20rem);
      overflow: hidden;
    }
    input{
      width: 70%;
    }
  }
</style>

<div transition:fade class="add-backdrop" on:click={closeSearch} />
<div transition:fly={{ x: 800 }} class="add">
  <div class="content">
    <label for="search">Search:</label>
    <input id="search"type="text" value="{search}" on:input={event => (search = event.target.value)}><hr>
  </div>
  <footer>
    <slot name="footer">
      <button on:click={closeSearch}>Close</button>
      <button on:click={searchScreenshot} >Search</button>
    </slot>
  </footer> 
</div>