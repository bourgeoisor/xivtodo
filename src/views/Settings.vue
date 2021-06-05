<template>
  <div class="container">
    <h1>Settings</h1>
    <hr />
    <form name="settings-form" id="settings-form">
      <div class="row">
        <div class="col-md-6">
          <h2>General</h2>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="inputCharacterID" id="inputCharacterID" placeholder="">
            <label for="inputCharacterID">Character ID</label>
            <div class="form-text">Enter your character ID. You can find it in <a href="https://na.finalfantasyxiv.com/lodestone/character/" target="_blank" rel="noopener noreferrer">Lodestone</a>.</div>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="inputSpoilersOption" id="inputSpoilersOption0" value="0">
            <label class="form-check-label" for="inputSpoilersOption0">
              Blur out all story-related duties
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="inputSpoilersOption" id="inputSpoilersOption1" value="1" checked>
            <label class="form-check-label" for="inputSpoilersOption1">
              Blur out non-completed story-related duties
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="inputSpoilersOption" id="inputSpoilersOption2" value="2">
            <label class="form-check-label" for="inputSpoilersOption2">Show all duties</label>
          </div>
          <div class="form-text">Select your preference in spoiler tags.</div>

          <br />
          <button
            type="button"
            id="settings-save-btn"
            class="btn btn-primary"
            onclick="saveSettings()"
          >
            Save
          </button>

          <br /><br />
          <span id="last-updated" class="text-muted"></span>
        </div>
      </div>
    </form>
  </div>
</template>
