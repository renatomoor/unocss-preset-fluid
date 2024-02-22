<script setup>
import NegativePositiveValues from '../components/NegativePositiveValues.vue';
</script>

# Negative and positive values

In order to use negative values you need to use a doble dash `--` to separate the values.

To add a positive value to a negative value, use the following syntax:

- Both negative: `f-ml--<px>--<px>`
- First positive, second negative: `f-ml-<px>--<px>`
- First negative, second positive: `f-ml--<px>-<px>`
- Both positive: `f-ml-<px>-<px>`

### Example with margin left:

```html
<div class="h-30 w-30 f-ml-50--25" />
<div class="h-30 w-30 f-ml--50-25" />
```

<NegativePositiveValues />
