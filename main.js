//startpagina
new Vue({
  el: "#app",
  methods: {
    navigateToSpreuk() {
      window.location.href = "spreuk.html";
    },

    navigateToTekst() {
      window.location.href = "tekst.html";
    },
  },
});

// spreuk pagina
new Vue({
  el: "#spreuk",
  data() {
    return {
      boxTexts: [
        "Laat wat je niet kunt, je niet verhinderen te doen wat je wel kunt",
        "Intelligente mensen zijn zelden gelukkig ",
        "It only takes one person to change your life: you!",
        "Zelfkennis is het begin van alle wijsheid.",
      ],
    };
  },
  methods: {
    navigeerNaarStart() {
      window.location.href = "index.html";
    },

    addNewBox() {
      // Create a custom prompt dialog
      const container = document.createElement("div");
      container.classList.add("prompt-container");

      // Input field for entering text
      const input = document.createElement("input");
      input.classList.add("prompt-input");
      input.type = "text";
      input.placeholder = "Enter text";
      container.appendChild(input);

      // Buttons for OK and Cancel actions
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("prompt-buttons");

      const okButton = document.createElement("button");
      okButton.classList.add("prompt-button");
      okButton.textContent = "OK";
      okButton.addEventListener("click", () => {
        const newText = input.value.trim();
        if (newText) {
          this.boxTexts.push(newText);
        } else {
          alert("Please enter text for the new box.");
        }
        document.body.removeChild(container); // Remove the prompt dialog
      });
      buttonsContainer.appendChild(okButton);

      const cancelButton = document.createElement("button");
      cancelButton.classList.add("prompt-button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => {
        document.body.removeChild(container); // Remove the prompt dialog
      });
      buttonsContainer.appendChild(cancelButton);

      container.appendChild(buttonsContainer);

      // Append the container to the body
      document.body.appendChild(container);
    },

    confirmBoxRemoval(index) {
      // Display a confirmation prompt
      const confirmed = confirm("Are you sure you want to delete this box?");
      if (confirmed) {
        // Remove the box from the array
        this.boxTexts.splice(index, 1);
      }
    },
  },
});

// tekst pagina
new Vue({
  el: "#tekst",
  data() {
    return {
      input1: "", // Data property for the first input field
      selectedColor: "red", // default kleur
    };
  },

  methods: {
    navigeerNaarStart() {
      window.location.href = "index.html";
    },

    async submitForm() {
      try {
        // Make an HTTP POST request to your backend endpoint
        const response = await fetch("http://raspberry_pi_ip:port/save-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: this.input1,
            color: this.selectedColor,
          }),
        });
        // Reset the input fields after successful submission
        this.input1 = "";
        this.selectedColor = "red"; // Reset color to default
      } catch (error) {
        console.error("Error sending data to server:", error);
        // Handle error
      }
    },
  },
});

// popup schermpje
new Vue({
  el: "#popUp",
  data: {
    popupVisible: false,
  },
  methods: {
    showPopup() {
      this.popupVisible = true;
    },
    hidePopup() {
      this.popupVisible = false;
    },
  },
});

// raspberry pi code voor de backend
//# app.py
//from flask import Flask, request, jsonify
//from db import db
//app = Flask(__name__)
//# Route for saving data
// @app.route('/save-data', methods=['POST'])
// def save_data():
//     data = request.json
//     text = data.get('text')
//     color = data.get('color')
//  # Save data to the database
//db.add_data(text, color)
// # Optionally, you can send the data to the ESP32 here
// return jsonify({'message': 'Data saved successfully'})

// if __name__ == '__main__':
//     app.run(host='0.0.0.0', port=80)

//tweede optie :

// # app.py

// from flask import Flask, request, jsonify
// from db import db

// app = Flask(__name__)

// # Route for saving data
// @app.route('/save-data', methods=['POST'])
// def save_data():
//     data = request.json
//     text = data.get('text')
//     color = data.get('color')
//     db.add_data(text, color)
//     return jsonify({'message': 'Data saved successfully'})

// # Route for saving spreuken
// @app.route('/save-spreuk', methods=['POST'])
// def save_spreuk():
//     data = request.json
//     spreuk = data.get('spreuk')
//     db.add_spreuk(spreuk)
//     return jsonify({'message': 'Spreuk saved successfully'})

// # Route for getting spreuken
// @app.route('/get-spreuken', methods=['GET'])
// def get_spreuken():
//     spreuken = db.get_spreuken()
//     return jsonify({'spreuken': spreuken})

// if __name__ == '__main__':
//     app.run(host='0.0.0.0', port=80)

// And in your db.py file, update the Database class to handle adding and retrieving spreuken:

// python
// Copy code
// # db.py

// class Database:
//     def __init__(self):
//         self.texts = []
//         self.spreuken = []

//     def add_data(self, text, color):
//         self.texts.append({'text': text, 'color': color})

//     def add_spreuk(self, spreuk):
//         self.spreuken.append(spreuk)

//     def get_spreuken(self):
//         return self.spreuken

// db = Database()
