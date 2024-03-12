require("events").EventEmitter.defaultMaxListeners = 200;
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
const fs = require("fs");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const db = require("quick.db");
client.cmds = new Discord.Collection();
const cmds = client.cmds;

const config = require("./config.json");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
///////////////////////////////////
client.on("ready", () => {
  console.log(`Logged As ${client.user.tag}`);
});

fs.readdir("./events/discord", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event] Loaded: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});

client.interactions = new Discord.Collection();
client.register_arr = [];

fs.readdir("./slash/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    client.interactions.set(props.name, {
      name: props.name,
      ...props,
    });
    client.register_arr.push(props);
  });
});

const prefix = config.prefix;
//main//
let jobs = [
  {
    name: `عسكري`,
    id: `عسكري`,
  },
];

let locc = [
  {
    name: `ساندي شور`,
    id: `ساندي شور`,
  },
];

client.on("interactionCreate", async (i) => {
  if (i.customId == "id") {




    let idcheck = db.get(`id_${i.user.id}`);
    if (idcheck == true) {
      return i.reply({ content: `**لديك هوية بالفعل**`, ephemeral: true });
    }

    i.reply({ content: `**تم بدء المقابلة في الخاص**`, ephemeral: true });

    let name = new Discord.MessageEmbed().setDescription("**__الاسم؟ (لديك 15 ثانية للاجابة)__**");
    let age = new Discord.MessageEmbed().setDescription("**__عمرك؟__**");
    let loc = new Discord.MessageEmbed().setDescription(
      `**__مكان الميلاد؟ (الرجاء الاختيار من القائمة)__**`
    );
    let jobe = new Discord.MessageEmbed().setDescription(
      `**__الوظيفة؟ (الرجاء الاختيار من القائمة)__**`
    );
    let job = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("job_select")
        .setPlaceholder("اختر الوظيفة")
        .addOptions(
          jobs.map((job) => ({
            label: job.name,
            value: job.id,
          }))
        )
    );
    let locss = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("loc_select")
        .setPlaceholder("اختر مكان الميلاد")
        .addOptions(
          locc.map((locs) => ({
            label: locs.name,
            value: locs.id,
          }))
        )
    );
    let id = new Discord.MessageEmbed().setDescription("**__رقم هويتك؟__**");
const nameb = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
  .setCustomId("name")
  .setLabel("اضغط هنا للاجابة")
  .setStyle("PRIMARY")
);
     let mu = await i.user.send({ embeds: [name], components: [nameb] })
    const filter = (reply) => reply.user.id === i.user.id;
const namecollecter = mu.createMessageComponentCollector({ filter, time: 15000 });

    namecollecter.on("collect", async (i) => { 
      if (i.customId === "name") {
const modal = new Discord.Modal()  
        .setCustomId('name')
        .setTitle('اسمك');
        
        const fields = {
         name: new Discord.TextInputComponent()
        .setCustomId('name')
        .setLabel("اسمك")
       .setStyle('SHORT')
        .setRequired(true)
      }
        const firstacr = new Discord.MessageActionRow().addComponents(fields.name);
        modal.addComponents(firstacr);
        await i.showModal(modal);

          const submitted = await i.awaitModalSubmit({
            time: 60000,
            filter: i => i.customId === "name",
          }).catch(error => {
            console.error(error);
            return null;
          });
        
        if (submitted) {
          const [name] = Object.keys(fields).map(key => submitted.fields.getTextInputValue(fields[key].customId));

          await submitted.reply({ content: `**__تم تسجيل اسمك بنجاح__**`, ephemeral: true });
          db.set(`tempname_${i.user.id}`, name);
          mu.delete()
          const ageb = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
          .setCustomId("age")
          .setLabel("اضغط هنا للاجابة")
          .setStyle("PRIMARY")
          );
          //age
           let mua = await i.user.send({ embeds: [age], components: [ageb] })
          const filter = (reply) => reply.user.id === i.user.id;
          const agecollecter = mua.createMessageComponentCollector({ filter, time: 15000 });

            agecollecter.on("collect", async (i) => { 
            if (i.customId === "age") {
          const modal = new Discord.Modal()  
              .setCustomId('age')
              .setTitle('عمرك');

              const fields = {
               name: new Discord.TextInputComponent()
              .setCustomId('age')
              .setLabel("عمرك")
             .setStyle('SHORT')
              .setRequired(true)
            }
              const firstacr = new Discord.MessageActionRow().addComponents(fields.name);
              modal.addComponents(firstacr);
              await i.showModal(modal);

                const submittedage = await i.awaitModalSubmit({
                  time: 60000,
                  filter: i => i.customId === "age",
                }).catch(error => {
                  console.error(error);
                  return null;
                });

              if (submittedage) {
                const [age] = Object.keys(fields).map(key => submittedage.fields.getTextInputValue(fields[key].customId));

                await submittedage.reply({ content: `**__تم تسجيل عمرك بنجاح__**`, ephemeral: true });
                db.set(`tempage_${i.user.id}`, age);
                  mua.delete()
                //loc
                 let mul = await i.user.send({ embeds: [loc], components: [locss] })
                const filter = (reply) => reply.user.id === i.user.id;
                const loccollecter = mul.createMessageComponentCollector({ filter, time: 15000 });

                    loccollecter.on("collect", async (i) => { 
                      if (i.customId === "loc_select") {
                    const value = i.values[0]
                    const select = locc.find(loc => loc.id === value)
                    if (select) {
                      await i.reply({ content: `**__تم تسجيل مكان الميلاد بنجاح__**`, ephemeral: true });
                      db.set(`temploc_${i.user.id}`, select.id);
                      mul.delete()
                      //job
                       let muj = await i.user.send({ embeds: [jobe], components: [job] })
                      const filter = (reply) => reply.user.id === i.user.id;
                      const jobcollecter = muj.createMessageComponentCollector({ filter, time: 15000 });

                            jobcollecter.on("collect", async (i) => { 
                            if (i.customId === "job_select") {
                          const value = i.values[0]
                          const select = jobs.find(job => job.id === value)
                          if (select) {
                            await i.reply({ content: `**__تم تسجيل الوظيفة بنجاح__**`, ephemeral: true });
                            db.set(`tempjob_${i.user.id}`, select.id);
                            muj.delete()
//id
                            const idb = new Discord.MessageActionRow().addComponents(
                              new Discord.MessageButton()
                            .setCustomId("idd")
                            .setLabel("اضغط هنا للاجابة")
                            .setStyle("PRIMARY")
                            );
                             let mui = await i.user.send({ embeds: [id], components: [idb] })
                            const filter = (reply) => reply.user.id === i.user.id;
                            const idcollecter = mui.createMessageComponentCollector({ filter, time: 15000 });

                                idcollecter.on("collect", async (i) => { 
                              if (i.customId === "idd") {
                            const modal = new Discord.Modal()  
                                .setCustomId('idd')
                                .setTitle('الهوية');

                                const fields = {
                                 name: new Discord.TextInputComponent()
                                .setCustomId('idd')
                                .setLabel("رقم الهوية")
                               .setStyle('SHORT')
                                .setRequired(true)
                              }
                                const firstacr = new Discord.MessageActionRow().addComponents(fields.name);
                                modal.addComponents(firstacr);
                                await i.showModal(modal);

                                  const submittedid = await i.awaitModalSubmit({
                                    time: 60000,
                                    filter: i => i.customId === "idd",
                                  }).catch(error => {
                                    console.error(error);
                                    return null;
                                  });

                                if (submittedid) {
                                  const [idd] = Object.keys(fields).map(key => submittedid.fields.getTextInputValue(fields[key].customId));

                                  await submittedid.reply({ content: `**__تم تسجيل رقم الهوية بنجاح__**`, ephemeral: true });
                                  mui.delete()
                                   await submittedid.followUp({ content: `**__تم انشاء هويتك بنجاح\nقم بكتابة: ${prefix}هويتي\n لرؤية هويتك__**`, ephemeral: true });
                                  db.set(`tempid_${i.user.id}`, idd);

const n = db.get(`tempname_${i.user.id}`)
const a = db.get(`tempage_${i.user.id}`)
const l = db.get(`temploc_${i.user.id}`)
const j = db.get(`tempjob_${i.user.id}`)
const iddd = db.get(`tempid_${i.user.id}`)
                                  
                                  const idData = {
                                    q1: n,
                                    q2: a,
                                    q3: l,
                                    q4: j,
                                    q5: iddd
                                  };
                                  db.set(`id_${i.user.id}`, idData);
                                  db.delete(`tempname_${i.user.id}`);
                                  db.delete(`tempage_${i.user.id}`);
                                  db.delete(`temploc_${i.user.id}`);
                                  db.delete(`tempjob_${i.user.id}`);
                                  db.delete(`tempid_${i.user.id}`);
let dataid = db.get(`id_${i.user.id}`)
                                  let log = new Discord.MessageEmbed()
                                    .setTitle("لوق انشاء هوية")
                                    .setDescription(
                                      `**- الحساب: ${i.user} - ${i.user.id}\n- الاسم: ${dataid.q1}\n- العمر: ${dataid.q2}\n- مكان الميلاد: ${dataid.q3}\n- الوظيفة: ${dataid.q4}\n- رقم الهوية: ${dataid.q5}**`
                                    )
                                    .setTimestamp()
                                    .setFooter({
                                      text: i.user.tag,
                                      iconURL: i.user.avatarURL({ dynamic: true }),
                                    })
                                    .setThumbnail(i.user.avatarURL({ dynamic: true }));

                                  client.channels.cache.get(config.identitylogroom).send({ embeds: [log] });
                                  
                          }
                            }
                      })
                    }
                            
                      }
                })
                    }
              }
        
          })
              
        }
};

            
            })   
        
  }
         
  }
    
})
  }
})


client.on("interactionCreate", async (i) => {
  if (i.customId === "login") {
    let status = db.get(`status_${i.guild.id}`);
    if (status == "off") {
      return i.reply({ content: "**تسجيل الدخول مغلق**", ephemeral: true });
    }
    let login = await db.get(`login_${i.user.id}`);
    if (login === true)
      return i.reply({
        content: "**لقد قمت بتسجيل دخولك من قبل بالفعل**",
        ephemeral: true,
      });

    db.set(`login_${i.user.id}`, true);
    let points = db.get(`points_${i.user.id}`) || 0;
    let embed = new Discord.MessageEmbed()
      .setTitle("تم تسجيل دخولك بنجاح")
      .setDescription(
        `**تم تسجيل دخولك بنجاح\n- الاسم: ${i.user}\n- نقاطك: ${points}**`
      )
      .setTimestamp()
      .setThumbnail(i.user.avatarURL({ dynamic: true }))
      .setFooter({
        text: i.user.tag,
        iconURL: i.user.avatarURL({ dynamic: true }),
      });

    let log = new Discord.MessageEmbed()
      .setTitle("لوق تسجيل دخول")
      .setDescription(
        `**تم تسجيل دخول جديد\n- الاسم: ${i.user}\n- نقاط الشخص: ${points}**`
      )
      .setTimestamp()
      .setFooter({
        text: i.user.tag,
        iconURL: i.user.avatarURL({ dynamic: true }),
      })
      .setThumbnail(i.user.avatarURL({ dynamic: true }));

    client.channels.cache.get(config.loginIdroom).send({ embeds: [log] });

    i.reply({ embeds: [embed], ephemeral: true });
  } else if (i.customId === "logout") {
    let status = db.get(`status_${i.guild.id}`);
    if (status == "off") {
      return i.reply({ content: "**تسجيل الخروج مغلق**", ephemeral: true });
    }

    let login = await db.get(`login_${i.user.id}`);

    if (!login)
      return i.reply({
        content: "**لقد قمت بتسجيل خروجك من قبل او لم تقم بتسجيل دخولك**",
        ephemeral: true,
      });

    db.delete(`login_${i.user.id}`);

    let points = db.get(`points_${i.user.id}`) || 0;

    let embed = new Discord.MessageEmbed()
      .setTitle("تم تسجيل خروجك بنجاح")
      .setDescription(
        `**تم تسجيل خروجك بنجاح\n- الاسم: ${i.user}\n- نقاطك: ${points}**`
      )
      .setTimestamp()
      .setThumbnail(i.user.avatarURL({ dynamic: true }))
      .setFooter({
        text: i.user.tag,
        iconURL: i.user.avatarURL({ dynamic: true }),
      });

    let log = new Discord.MessageEmbed()
      .setTitle("لوق تسجيل خروج")
      .setDescription(
        `**تم تسجيل خروج جديد\n- الاسم: ${i.user}\n- نقاط الشخص: ${points}
    **`
      )
      .setTimestamp()
      .setFooter({
        text: i.user.tag,
        iconURL: i.user.avatarURL({ dynamic: true }),
      })
      .setThumbnail(i.user.avatarURL({ dynamic: true }));

      client.channels.cache.get(config.logoutIdroom).send({ embeds: [log] });

    i.reply({ embeds: [embed], ephemeral: true });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "كشف-الكل")) {
    if (!message.member.roles.cache.has(config.adminroleid)) return;
    let points = db
      .all()
      .filter((data) => data.ID.startsWith(`points`))
      .sort((a, b) => b.data - a.data);
    if (points.length === 0) {
      return message.reply(`${message.author}, لا يوجد احد في قاعدة البيانات.`);
    }

    const PAGE_SIZE = 10;
    const numPages = Math.ceil(points.length / PAGE_SIZE);
    let page = 0;

    const generateEmbed = (authorID) => {
      const leaderboard = points.slice(
        page * PAGE_SIZE,
        (page + 1) * PAGE_SIZE
      );
      const finalLeaderboard = leaderboard
        .map((data, index) => {
          let tag;
          const user = client.users.cache.get(data.ID.split("_")[1]);

          tag = user ? user.username : "Unknown";

          return `** #${
            page * PAGE_SIZE + index + 1
          } | ${tag}** **\`${data.data.toLocaleString()}\` **\n`;
        })
        .join("");

      const embed = new Discord.MessageEmbed()
        .setDescription(finalLeaderboard)
        .setFooter(
          `الصفحة ${page + 1}/${numPages} | ${client.user.username}`,
          message.guild.iconURL()
        );

      return embed;
    };

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("prev")
        .setLabel("←")
        .setStyle("PRIMARY")
        .setDisabled(page <= 0),

      new Discord.MessageButton()
        .setCustomId("next")
        .setLabel("→")
        .setStyle("PRIMARY")
        .setDisabled(page >= numPages - 1)
    );

    const msg = await message.reply({
      embeds: [generateEmbed(message.author.id)],
      components: [row],
    });
    const filter = (i) => i.user.id == message.author.id;
    const collector = msg.createMessageComponentCollector({
      componentType: "BUTTON",
      filter: filter,
      time: 60000,
    });

    collector.on("collect", (interaction) => {
      if (interaction.customId === "prev" && page > 0) {
        page--;
      } else if (interaction.customId === "next" && page < numPages - 1) {
        page++;
      }

      const updatedEmbed = generateEmbed(message.author.id);

      row.components[0].setDisabled(page <= 0);
      row.components[1].setDisabled(page >= numPages - 1);

      interaction.update({
        embeds: [updatedEmbed],
        components: [row],
      });
    });

    collector.on("end", (interaction) => {
      row.components[0].setDisabled();
      row.components[1].setDisabled();
      msg.edit({
        components: [row],
      });
    });
  } else if (message.content.startsWith(prefix + "كشف")) {
    let user = message.mentions.users.first() || message.author;
    let points = db.get(`points_${user.id}`) || 0;
    let login = db.get(`login_${user.id}`) || "لا يوجد";
    let embed = new Discord.MessageEmbed()
      .setTitle("كشف معلومات")
      .setDescription(
        `**${
          user == message.author ? `نقاطك` : `نقاط ${user}`
        } : \`${points}\`**`
      )
      .setTimestamp()
      .setFooter({ text: user.tag, iconURL: user.avatarURL({ dynamic: true }) })
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setColor("RED")
      .setAuthor({
        name: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      });

    message.reply({ embeds: [embed] });
  }
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "اعطاء-نقاط")) {
    if (!message.member.roles.cache.has(config.adminroleid)) return;
    let user = message.mentions.users.first();
    if (!user) return message.reply("**منشن الشخص**");
    let args = message.content.split(" ");
    let points = args[2];
    if (!points) return message.reply("**اكتب عدد النقاط**");
    if (isNaN(points)) return message.reply("**هذا ليس رقما**");
    db.add(`points_${user.id}`, points);
    message.reply(`**تم اعطاء ${points} نقطة ل ${user}**`);
  }
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "سحب-نقاط")) {
    if (!message.member.roles.cache.has(config.adminroleid)) return;
    let user = message.mentions.users.first();
    if (!user) return message.reply("**منشن الشخص**");
    let args = message.content.split(" ");
    let points = args[2];
    if (!points) return message.reply("**اكتب عدد النقاط**");
    if (isNaN(points)) return message.reply("**هذا ليس رقما**");
    db.subtract(`points_${user.id}`, points);
    message.reply(`**تم سحب ${points} نقطة من ${user}**`);
  }
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "تصفير-الكل")) {
    if (!message.member.roles.cache.has(config.adminroleid)) return;
    let data1 = db
      .all()
      .map((entry) => entry.ID)
      .filter((id) => id.startsWith(`points_`));
    data1.forEach(db.delete);
    message.reply(`**تم تصفير الكل**`);
  }
});


client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "هويتي")) {
    let dataid = db.get(`id_${message.author.id}`)
    let embed = new Discord.MessageEmbed()
      .setTitle("هويتك")
      .setDescription(
        `**- الحساب: ${message.author} - ${message.author.id}\n- الاسم: ${dataid.q1}\n- العمر: ${dataid.q2}\n- مكان الميلاد: ${dataid.q3}\n- الوظيفة: ${dataid.q4}\n- رقم الهوية: ${dataid.q5}**`
      )
      .setTimestamp()
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.avatarURL({ dynamic: true }),
      })
      .setThumbnail(message.author.avatarURL({ dynamic: true }));
message.reply({ embeds: [embed] });
  }
});
setInterval(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill");
    process.kill(1);
  }
}, 3000);

client.login(process.env.token);
