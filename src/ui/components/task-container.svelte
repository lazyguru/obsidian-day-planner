<script lang="ts">
  import type { PlanItem } from "src/plan-item";
  import Task from "./task.svelte";

  export let tasks: PlanItem[] = [];

  const cancelMessage = "Release outside timeline to cancel";
  const defaultDurationForNewTask = 30;

  let pointerYCoords: number;
  let el: HTMLDivElement;
  let creating = false;

  function handleMousemove(event: MouseEvent) {
    pointerYCoords = event.clientY - el.getBoundingClientRect().top;
  }

  function startCreation() {
    creating = true;
  }

  function confirmCreation(event: MouseEvent) {
    if (creating) {
      event.stopPropagation();

      creating = false;
    }
  }

  function cancelCreation() {
    creating = false;
  }
</script>

<!-- TODO: use store to broadcast this -->
<svelte:document on:mouseup={cancelCreation} />

<div
  bind:this={el}
  class="task-container absolute-stretch-x"
  on:mousemove={handleMousemove}
  on:mousedown={startCreation}
  on:mouseup={confirmCreation}
>
  {#each tasks as taskProps (taskProps.startMinutes)}
    <Task {...taskProps} {pointerYCoords} />
  {/each}
  {#if creating}
    <Task
      isGhost
      text={cancelMessage}
      durationMinutes={defaultDurationForNewTask}
      {pointerYCoords}
    />
  {/if}
</div>

<style>
  .task-container {
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-left: 20px;
  }
</style>
