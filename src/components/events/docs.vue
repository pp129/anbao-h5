<template>
<div>
  <h2 class="_title">大型群众性活动安全许可申请表</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  2份  必要</p>
    <van-uploader v-model="fileList" multiple accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">单位营业执照或组织机构代码证及安全责任人身份证</h2>
  <van-cell-group>
    <p class="sub_title">要求：电子文档  必要</p>
    <van-uploader v-model="fileList" multiple accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">大型群众性活动方案及其说明</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  容缺后补</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">2个或2个以上承办者共同承办大型群众性活动的联合承办协议</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  必要</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">风险评估报告</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  必要</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">大型群众性活动安全工作方案</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  必要</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">活动场所管理者同意提供活动场所及活动场所、设施符合国家和本省建筑、消防安全标准、规定的证明</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  必要</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">临时搭建的设施、建筑物符合安全使用的证明</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  必要</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
  <h2 class="_title">依照法律、行政法规的规定，主管部门对大型群众性活动的承办者有资质、资格要求的，提交资质、资格证明</h2>
  <van-cell-group>
    <p class="sub_title">要求：原件  1份  必要</p>
    <van-uploader v-model="fileList" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
      <van-button plain hairline size="small" type="info">点击上传</van-button>
    </van-uploader>
  </van-cell-group>
</div>
</template>

<script>
export default {
  name: 'docs',
  data () {
    return {
      fileList: []
    }
  }
}
</script>

<style scoped lang="less">
  .van-cell-group{
    padding:10px 0;
  }
  .van-uploader{
    margin-left: 16px;
  }
</style>
