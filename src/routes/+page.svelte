<script lang="ts">
  import { HeroSection, AboutSection, MyWorkSection, SkillsSection, ContactSection } from "$components";

  let { data } = $props();
  let { workExperience, projects, skills } = data;
</script>

<HeroSection />
<AboutSection {workExperience} />
<MyWorkSection {projects} />
<SkillsSection {skills} />
<ContactSection />
