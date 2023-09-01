seen_alignments = set()

with open("/Users/chenlab/Desktop/blastcodetesting/format200blastresult.txt", "r") as input_file, open("/Users/chenlab/Desktop/blastcodetesting/filtered_200memberblastresults.txt", "w") as output_file:
    for line in input_file:
        parts = line.strip().split("\t")
        query_id, subject_id, evalue = parts[0], parts[1], parts[2]
        alignment_info = (query_id, subject_id, evalue)
        if alignment_info not in seen_alignments:
            seen_alignments.add(alignment_info)
            output_file.write(line)


