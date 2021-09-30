const VerticallyCentered = ({children, ...rest}) => {
    return ( 
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height:"100vh"
        }}
        {...rest}
      >
        <div style={{margin:"auto"}}>{children}</div>
      </div>
     );
}
 
export default VerticallyCentered;