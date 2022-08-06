const { Province, District, Ward } = require("./../models/location");
// const fetch = require('node-fetch');
const express = require("express");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const { handleError, handleSuccess } = require("../utils/handleResponse");
const { to } = require("await-to-js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sharp = require("sharp");
const { removeVietnameseTones } = require("../helper");
const { db } = require("../models/User");
const cloudinary = require("cloudinary").v2;
// const redis = require('redis')
// const REDIS_PORT = process.env.PORT || 6379
// const client = redis.createClient(REDIS_PORT)
// client.connect();

// client.on('connect', () => {
//     console.log('connected');
// });
const locationController = {
  createProvince: async (req, res) => {
    const listProvince = await axios.get(
      "https://vapi.vnappmob.com/api/province"
    );
    await listProvince.data.results.map(async (item) => {
      await new Province({
        province_id: item.province_id,
        province_name: item.province_name,
        param_url: removeVietnameseTones(item.province_name)
          .toLowerCase()
          .split(" ")
          .join("-"),
      }).save();
    });
    return handleSuccess(res, "Create new city successfully!");
  },
  createDistrict: async (req, res) => {
    const listProvince = await axios.get(
      "https://vapi.vnappmob.com/api/province"
    );
    listProvince.data.results.map(async (item) => {
      let listDictricts = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${item.province_id}`
      );
      listDictricts.data.results.map(async (item1) => {
        await new District({
          district_id: item1.district_id,
          district_name: item1.district_name,
          province_id: item1.province_id,
          param_url: removeVietnameseTones(item1.district_name)
            .toLowerCase()
            .split(" ")
            .join("-"),
        }).save();
      });
    });
    return handleSuccess(res, "Create new city successfully!");
  },
  createWards: async (req, res) => {
    const listProvince = await axios.get('https://vapi.vnappmob.com/api/province')
    listProvince.data.results.map(async(item) => {
      let listDictricts = await axios.get(`https://vapi.vnappmob.com/api/province/district/${item.province_id}`)
      listDictricts.data.results.map(async(item1) => {
        let wardsList = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${item1.district_id}`)
        await wardsList.data.results.map(async(item2) => {
          await new Ward({
            district_id: item2.district_id,
            ward_id: item2.ward_id,
            ward_name: item2.ward_name,
            param_url: await removeVietnameseTones(item2.ward_name).toLowerCase().split(' ').join('-')
          }).save()
        })
      })
    })
    return handleSuccess(res, "Create new wards successfully!");
  },
  insertDistrictToProvince: async (req, res) => {
    const listProvince = await Province.find({});
    const listDistricts = await District.find({});
    listProvince.map(async (province) => {
      listDistricts.map(async(district) => {
        if(district._doc.province_id === province._doc.province_id){
          await Province.updateOne(
            {
              _id: province._id,
            },
            {
              $set: {
                listDistricts: province._doc.listDistricts.push(district._id)
              },
            }
          );
        }
      })
      
    });
    return handleSuccess(res, "successfully!");
  },
  getAllProvince: async (req, res) => {
    await Province.find({})
      .then((data) => {
        return handleSuccess(res, data, "Get list city successfully!");
      });
  },
  getDistrictByProvinceId: async (req, res) => {
    const { province_id } = req.body;
    await District.find({ province_id: province_id })
      .then((data) => {
        return handleSuccess(res, data, "Get list city successfully!");
      })
      .catch((err) => {
        return handleError(err);
      });
  },
  getWardsByDistrictsId: async (req, res) => {
    const { district_id } = req.body;
    await Ward.find({ district_id: district_id })
      .then((data) => {
        return handleSuccess(res, data, "Get list wards successfully!");
      })
      .catch((err) => {
        return handleError(err);
      });
  },
};

module.exports = locationController;
