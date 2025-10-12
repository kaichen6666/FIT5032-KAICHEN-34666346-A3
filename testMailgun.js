// testMailgun.js
import Mailgun from "mailgun-js";

// —— 配置 —— 
const apiKey = "2a599128f11fe3914e9658d1d718ebfb-556e0aa9-e075245c"; 
const domain = "sandboxa48cd105f28c4f5e8930fa277d687237.mailgun.org"; 

// 初始化 Mailgun
const mailgun = Mailgun({ apiKey, domain });

// —— 邮件内容 —— 
const data = {
  from: `Mailgun Sandbox <postmaster@${domain}>`, 
  to: "wangjun6666666633@gmail.com", // 你新改的收件人，需在 Sandbox 验证
  subject: "测试邮件",
  text: "✅ Hello! 这是来自 Node.js 的测试邮件。"
};

// —— 发送邮件 —— 
mailgun.messages().send(data, (error, body) => {
  if (error) {
    console.error("❌ 发送失败:", error);
  } else {
    console.log("✅ 发送成功:", body);
  }
});
