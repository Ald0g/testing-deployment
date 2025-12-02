import math

PM_AC = "AC-Coupled Power Module"
PM_H1P = "Hybrid Single Phase Power Module"
PM_H3P = "Hybrid Three Phase Power Module"

PRODUCTS = {
    'A5101TZ4': {'Item type': 'Power module', 'Specs': 'AC-Coupled 5kW', 'Cost': 1124.76},
    'A5101GZ1': {'Item type': 'Power module', 'Specs': 'AC-Coupled 6kW', 'Cost': 1071.28},
    'A5102GZ3': {'Item type': 'Power module', 'Specs': 'Hybrid 1P 5kW', 'Cost': 1247.75},
    'A5102GZ4': {'Item type': 'Power module', 'Specs': 'Hybrid 1P 6kW', 'Cost': 1283.40},
    'A5103GZ1': {'Item type': 'Power module', 'Specs': 'Hybrid 3P 5kW', 'Cost': 1960.75},
    'A5103GZ2': {'Item type': 'Power module', 'Specs': 'Hybrid 3P 8kW', 'Cost': 2156.83},
    'A5103GZ3': {'Item type': 'Power module', 'Specs': 'Hybrid 3P 10kW', 'Cost': 2245.95},
    'A5103GZ4': {'Item type': 'Power module', 'Specs': 'Hybrid 3P 12kW', 'Cost': 2335.08},
    'A5220GZ1/TZ0': {'Item type': 'Battery Module', 'Specs': '5kW', 'Cost': 1960.75},
    'A5191TZ1': {'Item type': 'EV Charger', 'Specs': 'Anker Solix V1 Smart EV charger -7.4kW (including 7m cable)', 'Cost': 508.17},
    'A5191TZ2': {'Item type': 'EV Charger', 'Specs': 'Anker Solix V1 Smart EV charger -22kW (including 7m cable)', 'Cost': 637.81},
    'A5191GZ2-80': {'Item type': 'EV Charger', 'Specs': 'Anker SOLIX Anker SOLIX V1 EV Charger RFID Card', 'Cost': 3.50},
    'A17X7311': {'Item type': 'EV Charger', 'Specs': 'Anker SOLIX EV charger Smart Meter', 'Cost': 125.19},
    'A5460T12': {'Item type': 'Accessories', 'Specs': 'Mobile Dongle', 'Cost': 224.15},
    'A5461G11': {'Item type': 'Accessories', 'Specs': 'WLAN Dongle', 'Cost': 73.63},
    'A5420G23': {'Item type': 'Extra Power Sensors', 'Specs': '1P 100A for Hybrid 1P', 'Cost': 40.90},
    'A5430G21': {'Item type': 'Extra Power Sensors', 'Specs': '3P 100A for Hybrid 3P', 'Cost': 155.43},
    'A5420G24': {'Item type': 'Extra Power Sensors', 'Specs': '1P 100A Double CT', 'Cost': 81.81},
    'A5430G23': {'Item type': 'Extra Power Sensors', 'Specs': '3P 100A Double CT', 'Cost': 147.25},
    'A5430G22': {'Item type': 'Extra Power Sensors', 'Specs': '3P 250A', 'Cost': 188.15},
    'A5671A11': {'Item type': 'For battery-only tower', 'Specs': 'Top Cover', 'Cost': 49.08},
    'A5684A11': {'Item type': 'For secondary tower', 'Specs': 'Accessory Kit', 'Cost': 18.00},
    'A5670AZ1': {'Item type': 'For battery-only tower', 'Specs': 'Floor Mounting Base', 'Cost': 62.17},
    'A5674AZ1': {'Item type': 'For battery-only tower', 'Specs': 'Wall Mounting Bracket', 'Cost': 80.17}
}



power_modules = [
    {'name': PM_AC, 'power': 5, 'max_parallel': 1, 'sku': 'A5101TZ4'},
    {'name': PM_AC, 'power': 6, 'max_parallel': 1, 'sku': 'A5101GZ1'},
    {'name': PM_H1P, 'power': 5, 'max_parallel': 2, 'sku': 'A5102GZ3'},
    {'name': PM_H1P, 'power': 6, 'max_parallel': 2, 'sku': 'A5102GZ4'},
    {'name': PM_H3P, 'power': 5, 'max_parallel': 6, 'sku': 'A5103GZ1'},
    {'name': PM_H3P, 'power': 8, 'max_parallel': 6, 'sku': 'A5103GZ2'},
    {'name': PM_H3P, 'power': 10, 'max_parallel': 6, 'sku': 'A5103GZ3'},
    {'name': PM_H3P, 'power': 12, 'max_parallel': 6, 'sku': 'A5103GZ3'},
]

def get_all_possible_configurations():
    valid_configs = []
    for power_module in power_modules:
        for pm_qty in range(1, power_module['max_parallel'] + 1):
            total_power = power_module['power'] * pm_qty
            for battery_qty in range(1, 6*pm_qty + 1):
                valid_configs.append({
                    'power_module_type': power_module['name'],
                    'power_module_spec': power_module['power'],
                    'power_module_qty': pm_qty,
                    'power_module_sku': power_module['sku'],
                    'total_power': total_power,
                    'battery_qty': battery_qty
                })

    return valid_configs

def is_config_valid(config, req_power, req_capacity, allowance_percent):

    if config['power_module_qty'] > config['battery_qty']:
        return False

    # if config['total_power'] < req_power:
        # return False

    if abs(float(req_power - config['total_power'])/req_power) > float(allowance_percent)/100: # more than allowance_percent% away from the req power
        return False 
    
    # if config['battery_qty']*5 < req_capacity:
    #     return False
    
    if abs(float(req_capacity - config['battery_qty']*5)) > 4: # more than 4kWh away from the req capacity
        return False 

    return True

def print_quote(config):
    total = 0
    
    power_module_qty = config['power_module_qty']
    cost = PRODUCTS.get(config['power_module_sku']).get('Cost')*power_module_qty
    print(f"{power_module_qty} x Power Module: {config['power_module_type']} {config['power_module_spec']} kW | ${cost}")
    total += cost

    battery_qty = config.get('battery_qty')
    battery_cost = PRODUCTS.get('A5220GZ1/TZ0').get('Cost') * battery_qty
    print(f"{battery_qty} x 5 kWh Battery Module | ${battery_cost}")
    total += battery_cost

    number_of_towers = math.ceil(float(config.get('battery_qty')) / 4)
    accessory_qty = number_of_towers - 1
    accessory_cost = PRODUCTS.get('A5684A11').get('Cost') * accessory_qty
    print(f"{accessory_qty} x Accessory Kit | ${accessory_cost}")
    total += accessory_cost

    num_towers_without_pms = number_of_towers - power_module_qty
    print(f"{num_towers_without_pms} x Top Cover | ${PRODUCTS.get('A5671A11').get('Cost') * num_towers_without_pms}")
    print(f"{num_towers_without_pms} x Base | ${PRODUCTS.get('A5670AZ1').get('Cost') * num_towers_without_pms}")
    print(f"Total: {total}")
    print()

if __name__ == '__main__':
    power = int(input("Required power: "))
    capacity = int(input("Required capacity: "))

    allowance_percent = 10 #10%
    valid_configs = list(filter(lambda x: is_config_valid(x, power, capacity, allowance_percent), get_all_possible_configurations()))
    while allowance_percent < 50:
        if (len(valid_configs)):
            break

        valid_configs = list(filter(lambda x: is_config_valid(x, power, capacity, allowance_percent), get_all_possible_configurations()))
        allowance_percent += 1


    i = 1
    for valid_config in valid_configs:
        print(f"Option {i}")
        print_quote(valid_config)
        i += 1