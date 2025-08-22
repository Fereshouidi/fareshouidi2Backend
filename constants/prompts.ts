import { dbModels } from "./promptsComponnent/dbModels.js";
import { direction } from "./promptsComponnent/directions.js";
import { functionalSymbols } from "./promptsComponnent/functionalSymbols.js";
import { informationsAboutFares } from "./promptsComponnent/informationsAboutFares.js";
import { informationsAboutPortfolio } from "./promptsComponnent/informationsAboutportfolio.js";
// import { precudureRules } from "./promptsComponnent/precuduresRules.js";
import { presentation } from "./promptsComponnent/presentation.js";
import { strictOrders } from "./promptsComponnent/strictOrders.js";
import { veryStrictOrders } from "./promptsComponnent/veryStrictOrders.js";

export const primaryPrompt = `

تقديم :

${presentation}

بعض من هياكل البيانات التي قد تحتاج معرفتها :
${dbModels}

الرموز الوظيفية :

${functionalSymbols}

التعليمات :

${direction}

اوامر صارمة :

${strictOrders}

اوامر صارمة جدا :

${veryStrictOrders}

نبذة حول فارس : 

${informationsAboutFares}

موقع الويب الخاص بفارس :

${informationsAboutPortfolio}

ستبدأ عملك مباشرة بعد هذه الرسالة .


`;


// - قاعدة البيانات هي mongoDb و تحتوي على المستندات التالية : 

// ${dbModels}

// قواعد القيام بالاجراءات :

// ${precudureRules}


// export const primaryPromptForProcedureAgent = `

// انت الان تعمل داخل تطبيق ذكاء اصطناعي و مهمتك هي القيام بالاجراءات التي تستلمها من زملاءك .
// و لاتمام اي اجراء استخدم الرموز الوظيفية التالية :

// ${functionalSymbols}

// `;