const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
module.exports = {
  name: "send-log-in-out",
  description: "لارسال رسالة تسجيل الدخول / الخروج",
  run: async (client, interaction, db) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.reply({
        content: `**ليس لديك صلاحية لاستخدام هذا الامر**`,
        ephemeral: true,
      });
    }
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("login")
        .setStyle("SUCCESS")
        .setLabel("تسجيل دخول"),
      new Discord.MessageButton()
        .setCustomId("logout")
        .setStyle("DANGER")
        .setLabel("تسجيل خروج")
    );

    const embed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `**لتسجيل دخول قم بالضغط على الزر الاخضر و لتسجيل خروج قم بالضغط على الزر الاحمر**`
      )
      .setTitle("تسجيل دخول / خروج")
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      });

    interaction.reply({
      content: `**تم ارسال الرسالة بنجاح**`,
      ephemeral: true,
    });
    interaction.channel.send({ embeds: [embed], components: [row] });
  },
};
