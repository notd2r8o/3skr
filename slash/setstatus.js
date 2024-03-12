const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
module.exports = {
  name: "setstatus",
  description: "تحديد حالة التسجيل",
  options: [
    {
      name: `status`,
      description: `حالة التسجيل`,
      type: "STRING",
      required: true,
      choices: [
        {
          name: `on`,
          value: `on`,
        },
        {
          name: `off`,
          value: `off`,
        },
      ],
    },
  ],
  run: async (client, interaction, db) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.reply({
        content: `**ليس لديك صلاحية لاستخدام هذا الامر**`,
        ephemeral: true,
      });
    }
    let status = interaction.options.getString(`status`);
    if (status === `on`) {
      db.set(`status_${interaction.guild.id}`, `on`);
      interaction.reply({
        content: `**تم تحديد حالة التسجيل بنجاح**`,
        ephemeral: true,
      });
    } else if (status === `off`) {
      db.set(`status_${interaction.guild.id}`, `off`);
      interaction.reply({
        content: `**تم تحديد حالة التسجيل بنجاح**`,
        ephemeral: true,
      });
    }
  },
};
