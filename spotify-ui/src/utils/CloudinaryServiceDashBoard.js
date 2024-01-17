import { createContext, useEffect, useState, useContext } from "react";
import { makeUnauthenticatedPOSTRequest2 } from "./serverHelpers";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, currentUser }) {

  const [loaded, setLoaded] = useState(false);

  const [process, setProcess] = useState(true);

  const [urlAvatar, setUrlAvatar] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = async() => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.url);
            setUrlAvatar(result.info.url);
            
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
      if (urlAvatar) {
        const request = await makeUnauthenticatedPOSTRequest2(
          "/auth/upload_avatar",
          {
            email: currentUser.email,
            newAvatar: urlAvatar,
          }
        );
        if (request) {
          setProcess(false);
        } else {
          setProcess(true);
        }
      }
    }
  };

  // const UploadAvatar = async () => {
  //   if (urlAvatar) {
  //     const request = await makeUnauthenticatedPOSTRequest2(
  //       "/auth/upload_avatar",
  //       {
  //         email: currentUser.email,
  //         newAvatar: urlAvatar,
  //       }
  //     );
  //     if (request) {
  //       setProcess(false);
  //     } else {
  //       setProcess(true);
  //     }
  //   }
  //   console.log("Up")
  // };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      {process ? (
        <button
          id="upload_widget"
          // className="cloudinary-button"
          className=""
          onClick={(e) => {
            initializeCloudinaryWidget();
            // UploadAvatar();
          }}
        >
          Thay đổi Avatar
        </button>
      ) : (
        <div className="mt-4 cursor-pointer ml-4">Hoàn thành</div>
      )}
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
