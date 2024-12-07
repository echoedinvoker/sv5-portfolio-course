<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$components";

  const onclick = () => {
    goto("#contact-form");
  };
</script>

<nav class="navbar default-margin">
  <a href="/" class="logo">MT</a>
  <div class="navbar-links">
    <a href="/#about-me" class="nav-link">Abount Me</a>
    <a href="/#my-work" class="nav-link">Work</a>
    <Button className="nav-bar" {onclick}>Contact</Button>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .navbar-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .nav-link {
    font-size: 1rem;
    color: #333;
    text-decoration: none;
  }

  .nav-link:hover {
    text-decoration: underline;
  }
</style>
