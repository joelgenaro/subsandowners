const User = require("../models/mUser");
const axios = require("axios");
const sendEmail = require("../utils/sendEmail");

const getCountyFromAddress = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  return axios
    .get(url)
    .then((response) => {
      const components = response.data.results[0].address_components;
      let county;

      for (let i = 0; i < components.length; i++) {
        const types = components[i].types;
        if (types.includes("administrative_area_level_2")) {
          county = components[i].long_name;
          break;
        }
      }

      return county;
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendMatchedJobToContractors = async (data, jobLink) => {
  try {
    const { service, location, title, description, budget } = data;
    const county = await getCountyFromAddress(location);
    const query = {
      $and: [
        { sub: true },
        {
          $or: [
            county
              ? {
                  "service_area.county.value": {
                    $regex: new RegExp(county, "i"),
                  },
                }
              : {},
            service ? { services: service } : {},
          ],
        },
      ],
    };
    const projection = {
      email: 1,
      first_name: 1,
      last_name: 1,
    };
    const contractors = await User.find(query, projection).exec();

    contractors
      ? await Promise.all(
          contractors.map(async (user) => {
            await sendEmail({
              to: user.email,
              templateId: "d-4e5bcd627845464ca77856656ffef27e",
              data: {
                first_name: user.first_name,
                last_name: user.last_name,
                title: title,
                description: description,
                service: service,
                budget: budget,
                link: jobLink,
              },
            });
          })
        )
      : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMatchedJobToContractors,
};
