import React from "react";

// 快捷键sfc
const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span>
        totalCounters:{" "}
        <span className="badge badge-pill badge-secondary">
          {/* {this.props.totalCounters} */}
          {totalCounters}
        </span>
      </span>
    </nav>
  );
};

// class NavBar extends Component {
//   render() {
//     return (
//       <nav className="navbar navbar-light bg-light">
//         <span>
//           totalCounters:{" "}
//           <span className="badge badge-pill badge-secondary">
//             {this.props.totalCounters}
//           </span>
//         </span>
//       </nav>
//     );
//   }
// }

export default NavBar;
