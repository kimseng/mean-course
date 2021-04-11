db.loanDetails.mapReduce(
  function () {
    emit(this.emp_id, this.loanAmount);
  },
  function (key, values) {
    return Array.sum(values);
  },
  {
    query: { loanStatus: "Active" },
    out: "TotalLoan",
  }
);
