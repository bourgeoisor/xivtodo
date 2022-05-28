<template>
  <div class="container">
    <h1>{{ $t("page.help") }}</h1>
    <hr />
    <div class="row">
      <div class="col-lg-10 indent-paragraphs">
        <h2>Discord sign-in</h2>
        <p>
          To use XIV ToDo, you must sign in with a Discord account. This is an official
          authentication integration provided by Discord and allows for a much more secure system
          than a XIV ToDo-specific username and password would be, since no confidential information
          needs to be stored. By signing in with your Discord account, it provides your Discord
          username (but not your password) which is used to map to your characters, checklists, and
          completion.
        </p>

        <br />
        <h2>Adding characters</h2>
        <p>
          To add one of your characters, you first find its Lodestone URL. You can find it by
          logging into
          <a
            href="https://na.finalfantasyxiv.com/lodestone/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lodestone</a
          >
          and searching for your character profile. Your Lodestone URL will look similar to this
          example:
          <span class="font-monospace">
            https://na.finalfantasyxiv.com/lodestone/character/32741501/
          </span>
        </p>
        <p>
          Once you have found your profile URL, you can input it in the
          <router-link to="/settings">Settings</router-link> page and then click the
          <b>Add character</b> button.
        </p>
        <p>
          You can add as many as 8 characters, and switch between them at any time using the
          dropdown at the end of the main navigation bar.
        </p>

        <br />
        <h2>Free trial characters</h2>
        <p>
          Free trial characters are supported in XIV ToDo and can be added, but since the Lodestone
          privacy settings are unavailable on those accounts, the automatic completion tracker does
          not work for those characters.
        </p>

        <br />
        <h2>Enabling public achievements</h2>
        <p>
          If you add a character and your encounter and questline completions aren't getting
          registered, likely the achievements are not set to public visibility for that character.
          You can verify this by logging into
          <a
            href="https://na.finalfantasyxiv.com/lodestone/"
            target="_blank"
            rel="noopener noreferrer"
            >Lodestone</a
          >, and then accessing the
          <a
            href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Account Management</a
          >
          section. From there, make sure <b>Achievements</b> is set to <b>Public</b> and click
          <b>Confirm</b>.
        </p>
        <p>
          Once your achievements are public, you may need to re-add your character or refresh it via
          the <router-link to="/settings">Settings</router-link> page on XIV ToDo for it to take
          effect.
        </p>

        <br />
        <h2>Customizing character checklists</h2>
        <p>
          Daily and weekly checklists can be customized by clicking on the
          <b>Customize</b> button near the top right of the
          <router-link to="/checklist">Checklist</router-link> page. From there, you can add custom
          entries as well as hide entries that you don't want to see. To stop customizing, simply
          click the <b>Customize</b> button again.
        </p>

        <br />
        <h2>Encounter and questline completion</h2>
        <p>
          Encounter and questlines are automatically marked as cleared once the relevant
          achievements have been obtained. Since encounters or questlines don't always map directly
          directly to in-game achievement, automated completion tracking is not always fully
          accurate.
        </p>
        <p>
          XIV ToDo takes in-game achievements data from the Lodestone, which can take multiple hours
          to be up-to-date. Once a new in-game achievement is obtained, it may take up to 48 hours
          for the relevant encounter or questline to be marked as complete in XIV ToDo. You can also
          try forcing a refresh of the data through the
          <router-link to="/settings">Settings</router-link>.
        </p>
        <p>The following are the three possible statuses for each encounter and questline:</p>
        <p>
          <span class="text-success"><i class="fa-fw fal fa-check-circle text-success"></i> Sastasha</span><br />
          &nbsp;&nbsp;Your active character has cleared this encounter.<br />
          <span class="text-secondary"><i class="fa-fw fal fa-question-circle"></i> Sastasha</span><br />
          &nbsp;&nbsp;Your active character's current achievements cannot determine encounter
          clear.<br />
          <span><i class="fa-fw fal fa-circle"></i> Sastasha</span><br />
          &nbsp;&nbsp;Your active character has not cleared this encounter yet.
        </p>

        <br />
        <h2>Other questions</h2>
        <p>
          Contact me
          <a href="https://forms.gle/2t5nLB28xDyi3Tn6A" target="_blank" rel="noopener noreferrer">
            on this form</a
          >
          , on
          <a href="https://discord.gg/zfzhKhG3zj" target="_blank" rel="noopener noreferrer">
            Discord</a
          >
          or on
          <a href="https://twitter.com/xivtodo" target="_blank" rel="noopener noreferrer">
            Twitter</a
          >
          and I will reply as soon as possible.
        </p>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpView",
};
</script>
