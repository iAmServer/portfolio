<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #0a0a0a;
      padding: 64px;
      font-family: Inter;
      color: #f1f1f1;
    "
  >
    <div style="display: flex; align-items: center; justify-content: space-between">
      <div
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          background: #1d1d1d;
          border: 1px solid #2c2c2c;
          padding: 10px 18px;
          border-radius: 100px;
          font-size: 22px;
          font-weight: 500;
          color: #9b9b9b;
        "
      >
        <div style="width: 10px; height: 10px; border-radius: 999px; background: #ffffff" />
        <div style="display: flex">session granted &middot; role: visitor</div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 600;
          color: #6a6a6a;
        "
      >
        <div style="width: 8px; height: 8px; border-radius: 999px; background: #ffffff" />
        <div style="display: flex">iamserver.dev</div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column">
      <div
        style="
          display: flex;
          font-size: 88px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 20px;
        "
      >
        {{ name }}
      </div>
      <div
        style="
          display: flex;
          font-size: 30px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #9b9b9b;
        "
      >
        {{ role }}
      </div>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #1e1e1e;
        padding-top: 32px;
      "
    >
      <div style="display: flex; align-items: center; gap: 16px">
        <div
          v-for="tag in scope"
          :key="tag"
          style="
            display: flex;
            font-size: 22px;
            font-weight: 500;
            color: #9b9b9b;
            background: #1d1d1d;
            border: 1px solid #2c2c2c;
            padding: 8px 16px;
            border-radius: 8px;
          "
        >
          {{ tag }}
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 22px;
          font-weight: 600;
          color: #f1f1f1;
        "
      >
        <div style="width: 8px; height: 8px; border-radius: 999px; background: #ffffff" />
        <div style="display: flex">200 &middot; access granted</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    name?: string;
    role?: string;
    scope?: string[];
  }>(),
  {
    name: "Joshua Egbeyemi",
    role: "Senior Full-Stack Engineer, Identity, Search & Applied AI",
    scope: () => ["fullstack", "search", "applied_ai", "iam"],
  },
);
</script>
