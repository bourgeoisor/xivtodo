<template>
  <PageHeader title="page.sandbox" />

  <h1>H1 Header</h1>
  <h2>H2 Header</h2>
  <h3>H3 Header</h3>
  <h4>H4 Header</h4>
  <h5>H5 Header</h5>
  <h6>H6 Header</h6>

  <hr>

  <p>
    Normal text and <a href="#">link</a><br>
    <strong>Strong</strong> and <em>emphasized</em> text<br>
    <small>Small</small> and <abbr title="Abbreviation">abbr</abbr> text<br>
    <span class="text-muted">Muted</span> and <span class="text-success">Success</span> text<br>
    <span class="text-warning">Warning</span> and <span class="text-danger">Error</span> text<br>
    <span class="text-info">Info</span> and <span class="text-primary">Primary</span> text<br>
  </p>

  <hr>

  <AlertMsg type="normal" msg="Normal message <b>bold</b> and <a href='#' class='alert-link'>link</a>." />
  <AlertMsg type="muted" msg="Muted message <b>bold</b> and <a href='#' class='alert-link'>link</a>." />
  <AlertMsg type="success" msg="Success message <b>bold</b> and <a href='#' class='alert-link'>link</a>." />
  <AlertMsg type="warning" msg="Warning message <b>bold</b> and <a href='#' class='alert-link'>link</a>." />
  <AlertMsg type="danger" msg="Error message <b>bold</b> and <a href='#' class='alert-link'>link</a>." />
  <AlertMsg type="info" msg="Info message <b>bold</b> and <a href='#' class='alert-link'>link</a>." />

  <hr>

  <button type="button" class="btn btn-primary m-1">Primary</button>
  <button type="button" class="btn btn-secondary m-1">Secondary</button>
  <button type="button" class="btn btn-success m-1">Success</button>
  <button type="button" class="btn btn-danger m-1">Danger</button>
  <button type="button" class="btn btn-warning m-1">Warning</button>
  <button type="button" class="btn btn-info m-1">Info</button>
  <br>
  <button type="button" class="btn btn-outline-primary m-1">Primary</button>
  <button type="button" class="btn btn-outline-secondary m-1">Secondary</button>
  <button type="button" class="btn btn-outline-success m-1">Success</button>
  <button type="button" class="btn btn-outline-danger m-1">Danger</button>
  <button type="button" class="btn btn-outline-warning m-1">Warning</button>
  <button type="button" class="btn btn-outline-info m-1">Info</button>

  <hr>

  <h3>Items</h3>
  <span class="text-muted">
    {{ $t("shared.countTotal", { count: 3 }) }}
  </span>
  <div class="list-group list-group-flush">
    <DutyListItem
      :duty="{NameEN: 'Verified cleared', cleared: 1}"
      :filters="{}"
    />
    <DutyListItem
      :duty="{NameEN: 'Unverified cleared', cleared: 2}"
      :filters="{}"
    />
    <DutyListItem
      :duty="{NameEN: 'Unknown cleared', cleared: -1}"
      :filters="{}"
    />
    <DutyListItem
      :duty="{NameEN: 'Uncleared', cleared: 0}"
      :filters="{}"
    />
  </div>

</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import AlertMsg from '@/components/AlertMsg.vue'
import DutyListItem from '@/components/DutyListItem.vue'

export default {
  name: 'SandboxView',
  components: {
    PageHeader,
    AlertMsg,
    DutyListItem,
  },
}
</script>
