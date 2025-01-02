// Function to calculate subnet range details based on CIDR
function calculateSubnet() {
    const ipCIDR = document.getElementById("ip").value;

    if (!isValidCIDR(ipCIDR)) {
        alert("Please enter a valid IP address with CIDR notation (e.g., 192.168.1.0/24).");
        return;
    }

    // Split the input into IP address and CIDR prefix
    const [ip, prefix] = ipCIDR.split('/');
    const prefixLength = parseInt(prefix);

    if (prefixLength < 0 || prefixLength > 32) {
        alert("CIDR prefix must be between 0 and 32.");
        return;
    }

    // Convert CIDR prefix length to subnet mask
    const subnetMask = cidrToSubnetMask(prefixLength);

    const ipParts = ip.split(".").map(Number);

    // Calculate network address
    const networkAddress = ipParts.map((part, index) => part & subnetMask[index]).join(".");

    // Calculate broadcast address
    const broadcastAddress = subnetMask.map((part, index) => part | (255 - subnetMask[index])).join(".");

    // Calculate the first usable IP (network address + 1)
    const firstIP = networkAddress.split(".").map((part, index) => (index === 3 ? Number(part) + 1 : part)).join(".");

    // Calculate the last usable IP (broadcast address - 1)
    const lastIP = broadcastAddress.split(".").map((part, index) => (index === 3 ? Number(part) - 1 : part)).join(".");

    // Calculate total hosts
    const totalHosts = Math.pow(2, 32 - prefixLength) - 2;

    // Output results
    document.getElementById("network-address").innerText = `Network Address: ${networkAddress}`;
    document.getElementById("first-ip").innerText = `First Usable IP: ${firstIP}`;
    document.getElementById("last-ip").innerText = `Last Usable IP: ${lastIP}`;
    document.getElementById("broadcast-address").innerText = `Broadcast Address: ${broadcastAddress}`;
    document.getElementById("total-hosts").innerText = `Total Hosts: ${totalHosts}`;
}

// Validate CIDR input
function isValidCIDR(input) {
    const regex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
    return regex.test(input);
}

// Convert CIDR prefix length to subnet mask
function cidrToSubnetMask(prefixLength) {
    let mask = [];
    let binaryMask = "1".repeat(prefixLength) + "0".repeat(32 - prefixLength);
    for (let i = 0; i < 4; i++) {
        mask.push(parseInt(binaryMask.slice(i * 8, (i + 1) * 8), 2));
    }
    return mask;
}
