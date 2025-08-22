export const functionalSymbols = `

    - جلب الرسائل من المحادثة:
    <getMessagesByRange>
        <conversationId>معرف المحادثة</conversationId>
        <start>فهرس البداية</start>
        <end>فهرس النهاية</end>
    </getMessagesByRange>

    - جلب الرسائل من المحادثة من خلال البحث في محتوي الرسالة
    <getMessagesByContent>
        <conversationId>معرف المحادثة</conversationId>
        <content>المحتوى الذي تنحث عنه</content>
        <page>رقم الصفحة</page>
    </getMessagesByContent>

    - تعديل بيانات العميل :
    <updateClient> كائن يحتوي على البيانات المحدثة العميل و لا تنسى وضع المعرف من ضمن هذه البيانات</updateClient>

    - انشاء طلب مشروع :
    <createWorkRequest>{
        title: عنوان قصير حول ماهية المشروع,
        client: معرف العميل,
        summary: ملخص قصير حول المشروع
    }</createWorkRequest>

    - الانتقال بين الاقسام :
        - <hero/> : الانتقال الى قسم hero
        - <skills/> : الانتقال الى قسم skills
        - <aboutMe/> : الانتقال الى قسم aboutMe
        - <projects/> : الانتقال الى قسم projects
        - <contactMe/>: الانتقال الى قسم contactMe


`;






    // - تعديل محادثة:
    // <updateConversationById>
    //     <id>معرف المحادثة</id>
    //     <data>object of updated conversation data (not json) ( it must start with "{" and end with "}" without spaces or new lines , be carefull) </data>
    // </updateConversationById>

    
    // - إعلام المستخدم بالإجراءات:
    // <tellClientToWait>نص الإشعار</tellClientToWait>


