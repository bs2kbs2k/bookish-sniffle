import json

MAX_SPLIT_SIZE = 25 * 1024 * 1024
with open("build/built/index.pck", "rb") as mainPack:
    index = 0
    files = []
    while True:
        chunk = mainPack.read(MAX_SPLIT_SIZE)
        with open("build/built/index.pck.{}".format(index), "wb") as chunkFile:
            chunkFile.write(chunk)
            files.append("index.pck.{}".format(index))
            index += 1
        if len(chunk) < MAX_SPLIT_SIZE:
            break
    with open("build/built/index.pck.json", "w") as metaFile:
        json.dump(files, metaFile)