<script lang="ts">
  import { Button, SectionHeadline } from "$components";

  let contactName = $state("");
  let contactEmail = $state("");
  let contactMessage = $state("");

  let isFormInvalid = $state(false);

  let isLoading = $state(false);
  let isEmailSent = $state(false);
  let showErrorMessage = $state(false);

  async function onSubmit(event: Event) {
    event.preventDefault();

    if (!contactName || !contactEmail || !contactMessage) {
      isFormInvalid = true;
      return
    }

    isLoading = true;

    const response = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      }),
    })

    isLoading = false

    if (!response.ok) {
      showErrorMessage = true;
      return;
    }
       
    isEmailSent = true;
  }

  $effect(() => { if (contactName || !contactName) isFormInvalid = false; })
  $effect(() => { if (contactEmail || !contactEmail) isFormInvalid = false; })
  $effect(() => { if (contactMessage || !contactMessage) isFormInvalid = false; })

</script>

<section class="mt-l">
  <SectionHeadline sectionName="contact-form">Let's talk</SectionHeadline>
  <div class="form-container default-margin mt-m">
    {#if isEmailSent}
      <p class="success-text">Your message has been sent successfully. I'll get back to you as soon as possible.</p>
    {:else if showErrorMessage}
      <p class="error-text">Something went wrong. Please try again.</p>
    {:else if isLoading}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Sending...</p>
      </div>
    {:else}
    <form onsubmit={onSubmit}>
      <input
        class="text-input mb-m"
        class:input-error={isFormInvalid && !Boolean(contactName.length)}
        placeholder="Your Name"
        bind:value={contactName}
      />
      <input
        class="text-input mb-m"
        class:input-error={isFormInvalid && !Boolean(contactEmail.length)}
        placeholder="Your Email"
        bind:value={contactEmail}
      />
      <textarea
        class:input-error={isFormInvalid && !Boolean(contactMessage.length)}
        placeholder="Tell we what's up."
        bind:value={contactMessage}></textarea>
      <Button>Submit</Button>
    </form>
    {/if}
    <div class="form-text">
      <h3 class="bold mb-s">Talk to me about your project</h3>
      <p>
        I'm currently available for freelance work. If you have a project that you want to get started, think you need my help with something or just fancy saying hey, then get in touch. I'll do my best to get back to you as soon as possible.
      </p>
    </div>
  </div>
</section>

<style>
  section {
    padding-bottom: 140px;
  }
  .form-container {
    display: flex;
    justify-content: space-between;
  }
  .form-text {
    width: 39%;
  }
  .loading-container {
    width: 45%;
    display: flex;
    justify-content: flex-start;
    gap: 4px;
  }
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-top: 3px solid black;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .success-text, .error-text {
    width: 45%;
  }
   
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45%;
  }
  form * {
    font-size: 20px;
    font-family: "Inter Tight", sans-serif;
    font-weight: 500;
    color: black
  }
  textarea, input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.035);
    border-radius: 8px;
    padding: 4px 12px;
    outline: none;
    border: none;
  }
  input {
    height: 40px;
  }
  textarea {
    height: 120px;
    margin-bottom: 40px;
  }
  textarea::placeholder, input::placeholder {
    font-weight: 400;
  }

  .input-error {
    background-color: rgba(223, 87, 87, 0.667);
  }

  .input-error::placeholder {
    color: white;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>
