<template>
  <div class="container">
    <h1>Checklist</h1>
    <hr />
    <div class="row">
      <h2>Things to do</h2>

      <div class="col-md">
        <h3>
          Weeklies
          <small class="text-muted">&mdash; <span id="weeklies-reset">?</span> until reset</small>
        </h3>

        <ul id="weeklies" class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of weeklies"
            :key="item.Name"
            :id="item.ID"
            :title="item.Name"
          />
        </ul>
        <br />
      </div>

      <div class="col-md">
        <h3>
          Dailies
          <small class="text-muted">&mdash; <span id="dailies-reset">?</span> until reset</small>
        </h3>

        <ul id="dailies" class="list-group list-group-flush">
          <ChecklistItem v-for="item of dailies" :key="item.ID" :id="item.ID" :title="item.Name" />
        </ul>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import ChecklistItem from "@/components/ChecklistItem.vue";

export default {
  name: "Checklist",
  data() {
    return {
      weeklies: [
        { ID: 100, Name: "Weekly repeatable quests" },
        { ID: 101, Name: "Weekly hunt marks" },
        { ID: 102, Name: "Squadron priority mission" },
        { ID: 103, Name: "Challenge logs" },
        { ID: 104, Name: "Custom delivery" },
        { ID: 105, Name: "Wondrous Tails" },
        { ID: 106, Name: "Cap weekly tomestone" },
        { ID: 107, Name: "Doman enclave donation" },
        { ID: 108, Name: "Normal raid lockouts" },
        { ID: 109, Name: "Savage raid lockouts" },
        { ID: 110, Name: "Alliance raid lockout" },
        { ID: 111, Name: "Faux Hollows" },
        { ID: 112, Name: "Masque Carnivale" },
        { ID: 113, Name: "Blue mage logs" },
        { ID: 114, Name: "Gold Saucer tournaments" },
        { ID: 115, Name: "Fashion report" },
        { ID: 116, Name: "Jumbo Cactpot" },
      ],
      dailies: [
        { ID: 200, Name: "Daily repeatable quests" },
        { ID: 201, Name: "Daily hunt marks" },
        { ID: 202, Name: "Squadron missions" },
        { ID: 203, Name: "Grand company turn-ins" },
        { ID: 204, Name: "Retainer ventures" },
        { ID: 205, Name: "Housing gardening" },
        { ID: 206, Name: "Beast tribe quests" },
        { ID: 207, Name: "Treasure map allowance" },
        { ID: 208, Name: "Leve allowance" },
        { ID: 209, Name: "Duty roulettes" },
        { ID: 210, Name: "Mini Cactpot" },
      ],
    };
  },
  components: {
    ChecklistItem,
  },
};
</script>
