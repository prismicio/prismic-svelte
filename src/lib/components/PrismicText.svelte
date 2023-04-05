<script lang="ts">
	import * as prismicH from "@prismicio/helpers";

	import type { RichTextField as RichTextFieldType } from "@prismicio/types";
	import type { TitleField as TitleFieldType } from "@prismicio/types";

	export let field: TitleFieldType | RichTextFieldType;
	export let separator: string | undefined = undefined;
</script>

{@html prismicH.asText(field, separator)}
