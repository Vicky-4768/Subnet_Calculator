// Function to calculate subnet range details
function calculateSubnet() {
    const ip = document.getElementById("ip").value;
    const subnet = document.getElementById("subnet").value;

    if (!isValidIP(ip) || !isValidSubnet(subnet)) {
        alert("Please enter valid IP address and subnet mask.");
        return;
    }

    const ipParts = ip.split(".").map(Number);
    const subnetParts = subnet.split(".").map(Number);

    const networkAddress = ipParts.map((part, index) => part & subnetParts[index]).join(".");
    const broadcastAddress = subnetParts.map((part, index) => part | (255 - subnetParts[index]) ).join(".");

    const firstIP = networkAddress.split(".").map((part, index) => (index === 3 ? Number(part) + 1 : part)).join(".");
    const lastIP = broadcastAddress.split(".").map((part, index) => (index === 3 ? Number(part) - 1 : part)).join(".");

    const totalHosts = Math.pow(2, 32 - getSubnetMaskBits(subnet)) - 2;

    // Output results
    document.getElementById("network-address").innerText = `Network Address: ${networkAddress}`;
    document.getElementById("first-ip").innerText = `First Usable IP: ${firstIP}`;
    document.getElementById("last-ip").innerText = `Last Usable IP: ${lastIP}`;
    document.getElementById("broadcast-address").innerText = `Broadcast Address: ${broadcastAddress}`;
    document.getElementById("total-hosts").innerText = `Total Hosts: ${totalHosts}`;
}

// Validate IP address
function isValidIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

// Validate subnet mask
function isValidSubnet(subnet) {
    const regex = /^(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)\.(255|254|252|248|240|224|192|128|0)$/;
    return regex.test(subnet);
}

// Get the number of subnet mask bits
function getSubnetMaskBits(subnet) {
    const subnetParts = subnet.split(".").map(Number);
    let maskBits = 0;

    subnetParts.forEach(part => {
        maskBits += (part >>> 0).toString(2).split("1").length - 1;
    });

    return maskBits;
}
