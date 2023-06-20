function mailData(data) {
  return `<h1>Form Details</h1>
    <table class="table-auto">
      <tr>
        <td><b>Name:</b></td>
        <td>${data.name ? data.name : "-"}</td>
      </tr>
      <tr>
        <td><b>Email:</b></td>
        <td>${data.email ? data.email : "-"}</td>
      </tr>
      <tr>
        <td><b>Gender:</b></td>
        <td>${data.gender ? data.gender : "-"}</td>
      </tr>
      <tr>
        <td><b>Address:</b></td>
        <td>${data.address ? data.address : "-"}</td>
      </tr>
      <tr>
        <td><b>Country:</b></td>
        <td>${data.country ? data.country : "-"}</td>
      </tr>
      <tr>
        <td><b>Birth date:</b></td>
        <td>${data.b_date ? data.b_date : "-"}</td>
      </tr>
      <tr>
        <td><b>Country:</b></td>
        <td>${data.language ? data.language : "-"}</td>
      </tr>
    </table>`;
}

module.exports = mailData;
