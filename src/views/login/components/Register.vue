<template>
  <a-flex gap="middle" vertical>
    <h1>注册</h1>
    <a-form :model="form">
      <a-form-item>
        <a-input placeholder="请输入账号" />
      </a-form-item>
      <a-form-item>
        <a-input placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item>
        <a-input-password placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-input-password placeholder="请输入确定密码" />
      </a-form-item>
      <a-form-item>
        <a-flex gap="middle" justify="space-between">
          <a-input placeholder="请输入验证码" />
          <a-button>发送验证码</a-button>
        </a-flex>
      </a-form-item>
      <a-form-item>
        <a-flex gap="middle" justify="space-between">
          <a-checkbox>
            我同意
            <a-button type="link">xxx隐私协议</a-button>
          </a-checkbox>
        </a-flex>
      </a-form-item>
      <a-form-item>
        <a-button
          block
          size="large"
          type="primary"
        >
          注册
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          block
          size="large"
          @click="setAction(LoginAction.PasswordLogin)"
        >
          返回
        </a-button>
      </a-form-item>
    </a-form>
  </a-flex>
</template>

<script lang="ts" setup>
import { useLoginContext } from '@/views/login/utils/useLoginContext'
import { LoginAction } from '@/views/login/utils/type'

const { setAction } = useLoginContext()
const form = {}

</script>

<style scoped>

</style>
