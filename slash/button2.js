const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
module.exports = {
  name: "send-idcard",
  description: "لارسال رسالة انشاء هوية",
  run: async (client, interaction, db) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.reply({
        content: `**ليس لديك صلاحية لاستخدام هذا الامر**`,
        ephemeral: true,
      });
    }
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("id")
        .setStyle("SECONDARY")
        .setLabel("انشاء هوية")
    );

    const embed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(
        `**لانشاء هوية قم بالضغط على الزر و الاجابة على الاسئلة**`
      )
      .setTitle("انشاء هوية")
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
