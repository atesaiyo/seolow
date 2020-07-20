const puppeteer = require("puppeteer");
const axios = require("axios");
const url = "https://seolow.herokuapp.com/api/product";
const crawled = "https://canifa.com/";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(crawled, {
    waitUntil: "networkidle2",
  });

  let collectionLink = await page.evaluate(() => {
    return [...document.getElementsByClassName("ms-label")].map(
      (ele) => ele.href
    );
  });
  collectionLink = [
    collectionLink[0],
    collectionLink[1],
    collectionLink[2],
    collectionLink[3],
  ];

  let more = [];
  for (let i = 0; i < collectionLink.length; i++) {
    await page.goto(collectionLink[i], {
      waitUntil: "networkidle2",
    });

    const addMore = await page.evaluate(() => {
      let ele = [
        ...document
          .getElementsByClassName("pages")[1]
          .childElements()[1]
          .childElements(),
      ];
      ele.shift();
      ele.pop();
      return ele
        .map((ele) => ele.firstElementChild.href)
        .filter((href) => href !== "");
    });
    more = [...more, addMore[0]];
  }

  collectionLink = [...collectionLink, ...more];
  for (let j = 0; j < collectionLink.length; j++) {
    console.log(collectionLink[j]);

    await page.goto(collectionLink[j], {
      waitUntil: "networkidle2",
    });

    const productLinks = await page.evaluate(() =>
      [...document.getElementsByClassName("product-name")].map(
        (ele) => ele.firstElementChild.href
      )
    );

    const collected =
      j === 0 ? "female" : j === 1 ? "male" : j === 2 ? "girl" : "boy";
    let products = [];
    for (let i = 0; i < productLinks.length; i++) {
      await page.goto(productLinks[i], { waitUntil: "networkidle2" });
      let product = await page.evaluate(() => {
        const regex = /^[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]{2}[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ\s]*\n/gm;
        let details = document.getElementById("product-detail-tabs").innerText;
        let replaceProperty = details.match(regex);
        let oldString = details.split(regex);
        oldString.shift();
        details = "";
        replaceProperty.forEach((prop, i) => {
          details += prop + oldString[i] + "\n";
        });
        return {
          imagesLink: document.getElementsByClassName("item-zoom")[0]
            .firstElementChild.src,
          name: document.getElementsByClassName("product-name")[0]
            .firstElementChild.innerText,
          prices: Number(
            document
              .getElementsByClassName("price-box")[0]
              .firstElementChild.innerText.match(/[\d]*/g)
              .join("")
          ),
          details: details,
        };
      });
      products.push(product);
      console.log(products.length, product.name);
    }

    products = products.map((product) => ({
      ...product,
      collected: collected,
    }));

    products.forEach((product, i) => {
      axios.post(url + "/pushingdata", product);
      console.log("completed: " + (i + 1) + " products");
    });
  }

  console.log("All done");

  await await browser.close();
})();
