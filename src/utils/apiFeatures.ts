// import { Document, Query } from "mongoose";

// class APIFeatures {
//   query: Query<Document[], Document>;
//   queryString: Record<string, string>;
//   constructor(
//     query: Query<Document[], Document>,
//     queryString: Record<string, string>
//   ) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     // Build Query
//     // 1A Filtering
//     let queryObj = { ...this.queryString };
//     const excludedFields = ["page", "limit", "sort", "fields"];
//     excludedFields.forEach((item) => delete queryObj[item]);

//     // 1B Advanced Filtering
//     queryObj = JSON.stringify(queryObj).replace(
//       /\b(gte|lte|gt|lt)\b/g,
//       (match) => `$${match}`
//     );

//     this.query = this.query.find(JSON.parse(queryObj));

//     return this;
//   }

//   sort() {
//     // 2 Sorting
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(",").join(" ");
//       this.query = this.query.sort(sortBy);
//       console.log(this.queryString.sort);
//     } else {
//       this.query = this.query.sort("-_id");
//     }

//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(",").join(" ");
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select("-__v");
//     }
//     return this;
//   }

//   paginate() {
//     // 4 Pagination
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 20;
//     const skip = (page - 1) * limit;

//     this.query = this.query.skip(skip).limit(limit);

//     return this;
//   }
// }

// export default APIFeatures;
