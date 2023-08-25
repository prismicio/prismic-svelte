# `className` is not a valid prop

`<PrismicRichText>` and `<PrismicText>` do not accept a `className` prop. These components render a listo of components and do not have a wrapping element.

To add a `className` as a wrapper around the output of `<PrismicRichText>` or `<PrismicText>`, add a wrapper element with the `className`.

```svelte
<!-- ✅ Correct -->
<div className="prose">
	<PrismicRichText field={doc.data.richTextField} />
</div>
```

```svelte
<!-- ❌ Incorrect -->
<PrismicRichText field={doc.data.richTextField} className="prose" />
```

To add a `className` to a specific block type when using `<PrismicRichText>`, provide a custom component.

```svelte
<!-- Heading1.svelte -->

<h1 className="font-bold text-3xl"><slot /></h1>
```

```svelte
<script>
	import Heading1 from "./Heading1.svelte";
</script>

<PrismicRichText
	field={doc.data.richTextField}
	components={{
		heading1: Heading1,
	}}
/>
```
