// testMailgun.js
import Mailgun from "mailgun-js";

// —— 配置 —— 
const apiKey = ""; 
const domain = ""; 

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
