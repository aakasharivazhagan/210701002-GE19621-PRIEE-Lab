
# import g4f
# import sys
# import json
# import os

# def read_file_content(file_path):
#     try:
#         with open(file_path, 'r') as file:
#             return file.read()
#     except FileNotFoundError:
#         print(f"Error: File not found at {file_path}")
#         sys.exit(1)
#     except Exception as e:
#         print(f"Error reading file: {e}")
#         sys.exit(1)

# # Hardcoded path to the folder containing external text files
# external_files_folder = 'preprompts'
# print("1succ")
# # User-provided JSON data as a command line argument
# user_json_data = sys.argv[1]
# print("read succ")

# try:
#     # Parse the user-provided JSON string into a Python data structure
#     user_data = json.loads(user_json_data)
#     print("load")
# except json.JSONDecodeError as e:
#     print(f"Error decoding user-provided JSON: {e}")
#     sys.exit(1)

# try:
#     if not isinstance(user_data, list):
#         user_data = []

#     g4f.debug.logging = False  # Enable debug logging
#     g4f.debug.version_check = False  # Disable automatic version checking

#     # Iterate over each external file in the folder
#     print(external_files_folder)
#     for file_name in os.listdir(external_files_folder):

#         file_path = os.path.join(external_files_folder, file_name)
#         print(file_path)
#         # Read the content from the external file
#         external_content = read_file_content(file_path)
   
#         # Create a new element to prepend to the user-provided list
#         external_element = {"role": "user", "content": external_content}

#         # Prepend the external element to the user_data list
#         user_data.insert(0, external_element)
#         # print(user_data)
#     # Append the user-provided data to the user_data list
#     user_json_object = json.loads(user_json_data)
#     user_data.append(user_json_object)
#     # print(user_data)
#     response = g4f.ChatCompletion.create(
#         # model=g4f.models.default,
#         model = "gpt-3.5-turbo",
#         messages=user_data,
#         stream=True,  # in secs
#     )

# except Exception as e:
#     print("An error occurred:", e)
#     traceback.print_exc()

# # Ensure user_data is a list
# for message in response:
#     print(message, flush=True, end='')



# import g4f
# import sys
# import json
# import os

# def read_file_content(file_path):
#     try:
#         with open(file_path, 'r') as file:
#             return file.read()
#     except FileNotFoundError:
#         print(f"Error: File not found at {file_path}")
#         sys.exit(1)
#     except Exception as e:
#         print(f"Error reading file: {e}")
#         sys.exit(1)

# # Path to the folder containing external text files
# external_files_folder = 'preprompts'

# # User-provided JSON data as a command line argument
# user_json_data = sys.argv[1]

# try:
#     # Parse the user-provided JSON string into a Python data structure
#     user_data = json.loads(user_json_data)
# except json.JSONDecodeError as e:
#     print(f"Error decoding user-provided JSON: {e}")
#     sys.exit(1)

# try:
#     if not isinstance(user_data, list):
#         user_data = []

#     g4f.debug.logging = False  # Enable debug logging
#     g4f.debug.version_check = False  # Disable automatic version checking

#     # Iterate over each external file in the folder
#     for file_name in os.listdir(external_files_folder):
#         file_path = os.path.join(external_files_folder, file_name)

#         # Read the content from the external file
#         external_content = read_file_content(file_path)
   
#         # Create a new element to prepend to the user-provided list
#         external_element = {"role": "user", "content": external_content}

#         # Prepend the external element to the user_data list
#         user_data.insert(0, external_element)

#     # Append the user-provided data to the user_data list
#     user_json_object = json.loads(user_json_data)
#     user_data.append(user_json_object)

#     response = g4f.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=user_data,
#         stream=True,
#     )

# except Exception as e:
#     print("An error occurred:", e)
#     traceback.print_exc()

# # Ensure user_data is a list
# for message in response:
#     print(message, flush=True, end='')

import g4f
import sys
import json
import os

def read_file_content(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)

# Path to the folder containing external text files
external_files_folder = 'preprompts'

# Debugging: print the current working directory and contents of the external_files_folder
# print(f"Current working directory: {os.getcwd()}")
# print(f"Contents of the directory: {os.listdir(os.getcwd())}")
# print(f"Contents of the preprompts directory: {os.listdir(external_files_folder)}")

# User-provided JSON data as a command line argument
user_json_data = sys.argv[1]

try:
    # Parse the user-provided JSON string into a Python data structure
    user_data = json.loads(user_json_data)
except json.JSONDecodeError as e:
    print(f"Error decoding user-provided JSON: {e}")
    sys.exit(1)

try:
    if not isinstance(user_data, list):
        user_data = []

    g4f.debug.logging = False  # Enable debug logging
    g4f.debug.version_check = False  # Disable automatic version checking

    # Iterate over each external file in the folder
    for file_name in os.listdir(external_files_folder):
        file_path = os.path.join(external_files_folder, file_name)

        # Read the content from the external file
        external_content = read_file_content(file_path)
   
        # Create a new element to prepend to the user-provided list
        external_element = {"role": "user", "content": external_content}

        # Prepend the external element to the user_data list
        user_data.insert(0, external_element)
        # print(user_data)
        # print("flush\n")

    # print(type(user_data[0]))
    # Append the user-provided data to the user_data list
    user_json_object = json.loads(user_json_data)
    user_data.append(user_json_object)
    # print(user_data)
    response = g4f.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=user_data,
        stream=True,
    )

except Exception as e:
    print("An error occurred:", e)
    traceback.print_exc()

# Ensure user_data is a list
# print("oki")
for message in response:
    print(message, flush=True, end='')
