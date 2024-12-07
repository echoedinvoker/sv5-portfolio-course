<script>
  import { goto } from "$app/navigation";
  import { Button } from "$components";

  function onclick() {
    goto("/#about-me");
  }
</script>

<section class="hero-section default-margin mb-l">
  <h3>Hello! I'm Matt</h3>
  <div class="underscore mb-m"></div>
  <h1>I'm a Svelte developer crafting intuitive and performant</h1>
  <h1 class="dark-grey mb-m">web experiences.</h1>
  <Button {onclick}>Let's talk</Button>
</section>

<style>
  .hero-section {
    padding-top: 60px;
  }
</style>
