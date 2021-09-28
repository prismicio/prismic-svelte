<script lang="ts">
    let snippet = `<SliceZone\n  slices={arrayOfSliceComponents}\n  body={arrayOfDocumentSlices}\n/>`
    export let showErrors:boolean
</script>

{#if showErrors}
<div class="box">
    <h2 class="title">
      <slot name="heading">
        You haven't passed any Slice components or contents
      </slot>
    </h2>
    <p>
      <slot name="message">
        To start rendering components here, create a document on Prismic.<br />
        Then, update your SliceZone accordingly:<br />
      </slot>
    </p>
    <pre>
      <code class="code">
        {snippet}
      </code>
    </pre>
  </div>
{/if}

<style>
.box {
  max-width: 840px;
  padding: 44px;
  margin: 4rem auto;
  background: #FFF;
  color: #111;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
}
.code {
  background: #F5F6FA;
  padding: 6px;
  margin: 1rem auto;
  display: block;
}
.title {
  font-size: 32px;
  margin-bottom: 1rem 0;
}
p, pre {
  font-size: 22px;
  max-width: 650px;
  margin: 1rem 0;
}
</style>